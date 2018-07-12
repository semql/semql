import { SemQLExpression } from "./semql-expression";
import { ReplaceReturnType } from "./replace-return-type";

export interface Expression<TEntity> {
  AND(expression: Expression<TEntity>): Expression<TEntity>;
  OR(expression: Expression<TEntity>): Expression<TEntity>;
}

export type ExpressionWithOptions<TEntity, TOptions> =
  Expression<TEntity> &
  {
    [O in keyof TOptions]: ReplaceReturnType<TOptions[O], ExpressionWithOptions<TEntity, TOptions>>
  }

