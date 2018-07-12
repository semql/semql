import { Expression, ExpressionWithOptions } from "./expression";
import { StringOperatorOptions } from "./string-operators";
import { SemQLExpression } from "./semql-expression";

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

  some(expr: SemQLExpression<TItem>): Expression<TEntity>;
  every(expr: SemQLExpression<TItem>): Expression<TEntity>;
}
