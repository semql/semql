import { DataExpression, ExpressionWithOptions } from "../core/data-expression";

export interface BooleanOperators<TEntity> {
  equals(value: boolean): DataExpression<TEntity>;
  isTrue(): DataExpression<TEntity>;
  isFalse(): DataExpression<TEntity>;
}
