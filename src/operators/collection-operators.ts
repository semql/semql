import { BooleanExpression } from "../core/where-expression-proxy";
import { WhereExpression } from "../core/where-expression";

export interface CollectionOperators<TItem, TEntity> {
  some(expr: WhereExpression<TItem>): BooleanExpression<TEntity>;
  every(expr: WhereExpression<TItem>): BooleanExpression<TEntity>;
}
