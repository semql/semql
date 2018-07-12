import { Expression } from "./expression";
import { dataExpression } from "../symbols";
import { createProxy, ProxyType } from "./create-entity-proxy";

export function NOT<TEntity> (expression: Expression<TEntity>): Expression<TEntity> {
  const expr = expression[dataExpression];
  return createProxy<TEntity>(
    [],
    [expr[0], ["NOT", expr[1]], ...expr.slice(2)],
    ProxyType.Expression) as any as Expression<TEntity>;
}
