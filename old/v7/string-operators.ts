import { Expression, ExpressionWithOptions } from "./expression";
import { BetweenOperatorOptions } from "./standard-operators";
import { Range } from "./types/range";

export interface StringOperators<TEntity> {
  equals(other: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  before(other: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  beforeOrEqual(other: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  after(other: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  afterOrEqual(other: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  between(lowerBound: string, upperBound: string): ExpressionWithOptions<TEntity, StringOperatorOptions & BetweenOperatorOptions>;
  startsWith(prefix: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  startsWithAnyOf(prefixes: string[]): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  anyOf(values: string[]): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  noneOf(values: string[]): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  notEqual(value: string): ExpressionWithOptions<TEntity, StringOperatorOptions>;
  withinRanges(ranges: Range<string>[]): ExpressionWithOptions<TEntity, StringOperatorOptions>;
}

export interface StringOperatorOptions {
  ignoreCase(): void;
  ignoreAccents(): void;
}
