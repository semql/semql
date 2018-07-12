import { Expression } from "../core/expression";
import { JsExpression } from "../core/js-expression";

export interface CollectionOperators<TItem, TEntity> {
  some(expr: JsExpression<TItem>): Expression<TEntity>;
  every(expr: JsExpression<TItem>): Expression<TEntity>;
}
