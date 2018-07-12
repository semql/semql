import { JsExpression } from "./js-expression";
import { ReplaceReturnType } from "../utils/replace-return-type";
import { dataExpression } from "../symbols";

export interface Expression<TEntity> {
  AND(expression: Expression<TEntity>): Expression<TEntity>;
  OR(expression: Expression<TEntity>): Expression<TEntity>;
  [dataExpression]: any[];
}

export type ExpressionWithOptions<TEntity, TOptions> =
  Expression<TEntity> &
  {
    [O in keyof TOptions]: ReplaceReturnType<TOptions[O], ExpressionWithOptions<TEntity, TOptions>>
  }

