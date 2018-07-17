import { ExpressionProxy, ExpressionProxyWithOptions } from "../core/expression-proxy";
import { BetweenOperatorOptions } from "./standard-operators";

export interface DateOperators<TEntity> {
  equals(other: Date): ExpressionProxy<TEntity>;
  before(other: Date): ExpressionProxy<TEntity>;
  beforeOrEqual(other: Date): ExpressionProxy<TEntity>;
  after(other: Date): ExpressionProxy<TEntity>;
  afterOrEqual(other: Date): ExpressionProxy<TEntity>;
  between(from: Date, to: Date): ExpressionProxyWithOptions<TEntity, BetweenOperatorOptions>;
}
