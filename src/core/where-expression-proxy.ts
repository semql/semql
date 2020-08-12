import { WhereExpression } from "./where-expression";
import { ReplaceReturnType } from "../utils/replace-return-type";
import { Introspect } from "../symbols";
import { ExpressionJson } from "./expression-json";
import { ProxyType } from "./create-proxy";

export interface BooleanExpression<TEntity> {
  AND<TExpressionProxy extends BooleanExpression<TEntity>>(expression: TExpressionProxy): this | TExpressionProxy;
  OR<TExpressionProxy extends BooleanExpression<TEntity>>(expression: TExpressionProxy): this | TExpressionProxy;
}

export type ExpressionProxyWithOptions<TEntity, TOptions> =
  BooleanExpression<TEntity> &
  {
    [O in keyof TOptions]: ReplaceReturnType<TOptions[O], ExpressionProxyWithOptions<TEntity, TOptions>>
  }

export interface ExportableExpressionProxy extends BooleanExpression<any> {
  [Introspect]: {
    expr: ExpressionJson | undefined,
    propPath: string[],
    type: ProxyType
  };
}
