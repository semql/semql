import { DataExpression, ExpressionWithOptions } from "../core/data-expression";
import { StandardOperators, BetweenOperatorOptions } from "./standard-operators";

export type SequenceOperators<T, TEntity> = StandardOperators<T, TEntity> & {
  startsWith(prefix: T): DataExpression<TEntity>;
  startsWithAnyOf(prefixes: T[]): DataExpression<TEntity>;
}
