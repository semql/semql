import { Expression } from "./expression";
import { SemQLExpression } from "./semql-expression";

export interface CollectionOperators<TItem, TEntity> {
  some(expr: SemQLExpression<TItem>): Expression<TEntity>;
  every(expr: SemQLExpression<TItem>): Expression<TEntity>;
}
