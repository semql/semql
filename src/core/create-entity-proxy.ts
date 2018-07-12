import { EntityProxy } from "./entity-proxy";
import { Expression } from "./expression";
import { dataExpression } from "../symbols";

const FUNC = function(){};

export const enum ProxyType {
  Entity,
  Expression
}

export function createProxy<TEntity=any> (propertyPath?: PropertyKey[], expr?: any[], type: ProxyType=ProxyType.Entity): EntityProxy<TEntity> {
  const propPath = propertyPath || [];
  return new Proxy(FUNC, {
    get (obj, prop) {
      return prop === dataExpression ?
        expr :
        createProxy(propPath ? [...propPath, prop] : [prop], expr, type);
    },
    set (obj, prop, value) {
      throw new Error("Cannot set value in SemQL expressions");
    },
    apply: function (target, thiz, args) {
      const pMethod = propPath.length - 1;
      const method = propPath[pMethod];
      return type === ProxyType.Entity ?
        createProxy([], [
          propPath.slice(0, pMethod).join('.'),
          method,
          args.length > 2 ? args : args[0]
        ], ProxyType.Expression) :
        method === "AND" || method === "OR" ?
          createProxy([], [expr, method, args[0][dataExpression]], ProxyType.Expression) :
          createProxy([], [
            ...expr!,
            args.length > 0 ?
              [method, ...args] :
              method
          ], ProxyType.Expression);
    }
  }) as any as EntityProxy<TEntity>;
}
