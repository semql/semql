import { Expression, ExportableExpression } from "./expression";
import { Introspect } from "../symbols";
import { createProxy, ProxyType } from "./create-entity-proxy";

export function NOT<TEntity> (expression: Expression<TEntity>): Expression<TEntity> {
  const expr = (expression as ExportableExpression)[Introspect].expr;
  if (!expr) throw new Error("Invalid expression");
  return createProxy<TEntity>(
    [],
    [expr[0], ["NOT", expr[1]], ...expr.slice(2)],
    ProxyType.Expression) as any as Expression<TEntity>;
}
