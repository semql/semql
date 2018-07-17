import { JsExpression } from "./js-expression";
import { ReplaceReturnType } from "../utils/replace-return-type";
import { Introspect } from "../symbols";
import { Expression } from "./expression";
import { ProxyType } from "./create-proxy";

export interface ExpressionProxy<TEntity> {
  AND<TExpressionProxy extends ExpressionProxy<TEntity>>(expression: TExpressionProxy): this | TExpressionProxy;
  OR<TExpressionProxy extends ExpressionProxy<TEntity>>(expression: TExpressionProxy): this | TExpressionProxy;
}

export type ExpressionProxyWithOptions<TEntity, TOptions> =
  ExpressionProxy<TEntity> &
  {
    [O in keyof TOptions]: ReplaceReturnType<TOptions[O], ExpressionProxyWithOptions<TEntity, TOptions>>
  }

export interface ExportableExpressionProxy extends ExpressionProxy<any> {
  [Introspect]: {
    expr: Expression | undefined,
    propPath: string[],
    type: ProxyType
  };
}
