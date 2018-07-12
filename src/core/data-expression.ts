import { JsExpression } from "./js-expression";
import { ReplaceReturnType } from "../utils/replace-return-type";

export interface DataExpression<TEntity> {
  AND(expression: DataExpression<TEntity>): DataExpression<TEntity>;
  OR(expression: DataExpression<TEntity>): DataExpression<TEntity>;
}

export type ExpressionWithOptions<TEntity, TOptions> =
  DataExpression<TEntity> &
  {
    [O in keyof TOptions]: ReplaceReturnType<TOptions[O], ExpressionWithOptions<TEntity, TOptions>>
  }

