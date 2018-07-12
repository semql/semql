import { DataExpression } from "../core/data-expression";
import { JsExpression } from "../core/js-expression";

export interface CollectionOperators<TItem, TEntity> {
  some(expr: JsExpression<TItem>): DataExpression<TEntity>;
  every(expr: JsExpression<TItem>): DataExpression<TEntity>;
}
