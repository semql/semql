import { ExportableExpressionProxy, BooleanExpression } from "./where-expression-proxy";
import { Introspect } from "../symbols";
import { createProxy, ProxyType } from "./create-proxy";

export function NOT<TEntity> (expression: BooleanExpression<TEntity>): BooleanExpression<TEntity> {
  const expr = (expression as ExportableExpressionProxy)[Introspect].expr;
  if (!expr) throw new Error("Invalid expression");
  const [lvalue, operator, rvalue, ...options] = expr;
  return createProxy<TEntity>(
    [],
    [
      lvalue,
      (operator.startsWith("NOT ") ?
        operator.substr(4) : // Remove "NOT " from operator
        "NOT " + operator), // Add "NOT " before operator
      rvalue,
      ...options
    ],
    ProxyType.Expression) as any as BooleanExpression<TEntity>;
}
