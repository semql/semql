import { Expression, ExpressionWithOptions } from "../core/expression";
import { StringOperatorOptions } from "./string-operators";
import { JsExpression } from "../core/js-expression";

export interface SetOperators<TItem, TEntity> {
  includes(value: TItem): TItem extends string ?
    ExpressionWithOptions<TEntity, StringOperatorOptions> :
    Expression<TEntity>;
  includesAnyOf(values: TItem[]): TItem extends string ?
    ExpressionWithOptions<TEntity, StringOperatorOptions> :
    Expression<TEntity>;
  includesAll(values: TItem[]): TItem extends string ?
    ExpressionWithOptions<TEntity, StringOperatorOptions> :
    Expression<TEntity>;

  some(expr: JsExpression<TItem>): Expression<TEntity>;
  every(expr: JsExpression<TItem>): Expression<TEntity>;
}
