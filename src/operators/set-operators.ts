import { DataExpression, ExpressionWithOptions } from "../core/data-expression";
import { StringOperatorOptions } from "./string-operators";
import { JsExpression } from "../core/js-expression";

export interface SetOperators<TItem, TEntity> {
  includes(value: TItem): TItem extends string ?
    ExpressionWithOptions<TEntity, StringOperatorOptions> :
    DataExpression<TEntity>;
  includesAnyOf(values: TItem[]): TItem extends string ?
    ExpressionWithOptions<TEntity, StringOperatorOptions> :
    DataExpression<TEntity>;
  includesAll(values: TItem[]): TItem extends string ?
    ExpressionWithOptions<TEntity, StringOperatorOptions> :
    DataExpression<TEntity>;

  some(expr: JsExpression<TItem>): DataExpression<TEntity>;
  every(expr: JsExpression<TItem>): DataExpression<TEntity>;
}
