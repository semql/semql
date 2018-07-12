import { Expression, ExpressionWithOptions } from "../core/expression";
import { BetweenOperatorOptions } from "./standard-operators";

export interface DateOperators<TEntity> {
  equals(other: Date): Expression<TEntity>;
  before(other: Date): Expression<TEntity>;
  beforeOrEqual(other: Date): Expression<TEntity>;
  after(other: Date): Expression<TEntity>;
  afterOrEqual(other: Date): Expression<TEntity>;
  between(from: Date, to: Date): ExpressionWithOptions<TEntity, BetweenOperatorOptions>;
}
