import { ExpressionProxy, ExpressionProxyWithOptions } from "../core/where-expression-proxy";
import { StandardOperators, BetweenOperatorOptions } from "./standard-operators";

export type SequenceOperators<T, TEntity> = StandardOperators<T, TEntity> & {
  startsWith(prefix: T): ExpressionProxy<TEntity>;
  startsWithAnyOf(prefixes: T[]): ExpressionProxy<TEntity>;
}
