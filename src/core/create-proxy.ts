import { EntityProxy } from "./entity-proxy";
import { ExpressionProxy } from "./expression-proxy";
import { Introspect } from "../symbols";
import { addOption } from "./options";

const FUNC = function(){};

export const enum ProxyType {
  Entity,
  Expression
}

export function createProxy<TEntity=any> (
  propertyPath?: PropertyKey[],
  expr?: any[],
  type: ProxyType=ProxyType.Entity): EntityProxy<TEntity>
{
  const propPath = propertyPath || [];
  return new Proxy(FUNC, {
    get (obj, prop) {
      return prop === Introspect ?
        {expr, propPath, type} :
        createProxy(propPath ? [...propPath, prop] : [prop], expr, type);
    },
    set (obj, prop, value) {
      throw new Error("Cannot set value in SemQL expressions");
    },
    apply: function (target, thiz, args) {
      const pMethod = propPath.length - 1;
      const method = propPath[pMethod];
      return type === ProxyType.Entity ? // address.street.equals("D") - "equals" is method, ["D"] is args.
        createProxy([], [
          propPath.slice(0, pMethod).join('.'), // "address.street"
          method, // equals, above, below, some, etc...
          args.length > 1 ?
            // Args is not a single argument. Let args parameter contain all args as the array it is.
            args :
            // Is the argument a function such as cars.some(car => car.brand.equals(volvo))?
            typeof args[0] === 'function' ?
              // Argument is a JS expression such as cars.some(...). Evaluate it:
              args[0](createProxy())[Introspect].expr :
              // Argument is a single argument containing a value
              args[0]
        ], ProxyType.Expression) :
        method === "AND" || method === "OR" ?
          // Combined expression. Evalute right value and combine it (method is the logical operator):
          createProxy([], [expr, method, args[0][Introspect].expr], ProxyType.Expression) :
          // Option. Clone the expression proxy with options applied
          createProxy([], [
            expr![0],
            expr![1],
            expr![2],
            addOption(expr![3], method as string, args)
          ], ProxyType.Expression);
    }
  }) as any as EntityProxy<TEntity>;
}

