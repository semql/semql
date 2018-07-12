import { Expression, ExpressionWithOptions } from "./expression";
import { BetweenOperatorOptions } from "./standard-operators";
import { Range } from "./types/range";

export interface DateOperators<TEntity> {
  equals(other: Date): Expression<TEntity>;
  before(other: Date): Expression<TEntity>;
  beforeOrEqual(other: Date): Expression<TEntity>;
  after(other: Date): Expression<TEntity>;
  afterOrEqual(other: Date): Expression<TEntity>;
  between(from: Date, to: Date): ExpressionWithOptions<TEntity, BetweenOperatorOptions>;
  withinRanges(ranges: Range<Date>[]): Expression<TEntity>;
}
