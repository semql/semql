import { DataExpression, ExpressionWithOptions } from "../core/data-expression";
import { BetweenOperatorOptions } from "./standard-operators";

export interface DateOperators<TEntity> {
  equals(other: Date): DataExpression<TEntity>;
  before(other: Date): DataExpression<TEntity>;
  beforeOrEqual(other: Date): DataExpression<TEntity>;
  after(other: Date): DataExpression<TEntity>;
  afterOrEqual(other: Date): DataExpression<TEntity>;
  between(from: Date, to: Date): ExpressionWithOptions<TEntity, BetweenOperatorOptions>;
}
