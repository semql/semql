import { ExpressionProxy, ExpressionProxyWithOptions } from "../core/expression-proxy";
import { BetweenOperatorOptions } from "./standard-operators";

export interface StringOperators<TEntity> {
  equals(other: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  before(other: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  beforeOrEqual(other: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  after(other: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  afterOrEqual(other: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  between(lowerBound: string, upperBound: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions & BetweenOperatorOptions>;
  startsWith(prefix: string): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  startsWithAnyOf(prefixes: string[]): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
  anyOf(values: string[]): ExpressionProxyWithOptions<TEntity, StringOperatorOptions>;
}

export interface StringOperatorOptions {
  ignoreCase(): void;
  matchCase(): void;
  ignoreAccent(): void;
  matchAccent(): void;
  locale(locale: string): void;
}
