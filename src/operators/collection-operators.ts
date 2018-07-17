import { ExpressionProxy } from "../core/expression-proxy";
import { JsExpression } from "../core/js-expression";

export interface CollectionOperators<TItem, TEntity> {
  some(expr: JsExpression<TItem>): ExpressionProxy<TEntity>;
  every(expr: JsExpression<TItem>): ExpressionProxy<TEntity>;
}
