import { Expression, ExpressionWithOptions } from "../core/expression";

export interface BooleanOperators<TEntity> {
  equals(value: boolean): Expression<TEntity>;
  isTrue(): Expression<TEntity>;
  isFalse(): Expression<TEntity>;
}
