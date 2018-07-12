import { Expression, ExpressionWithOptions } from "../core/expression";
import { StandardOperators, BetweenOperatorOptions } from "./standard-operators";

export type SequenceOperators<T, TEntity> = StandardOperators<T, TEntity> & {
  startsWith(prefix: T): Expression<TEntity>;
  startsWithAnyOf(prefixes: T[]): Expression<TEntity>;
}
