import { JsExpression } from "./js-expression";
import { ReplaceReturnType } from "../utils/replace-return-type";
import { Introspect } from "../symbols";
import { DataExpression } from "./data-expression";
import { ProxyType } from "./create-entity-proxy";

export interface Expression<TEntity> {
  AND(expression: Expression<TEntity>): Expression<TEntity>;
  OR(expression: Expression<TEntity>): Expression<TEntity>;
}

export type ExpressionWithOptions<TEntity, TOptions> =
  Expression<TEntity> &
  {
    [O in keyof TOptions]: ReplaceReturnType<TOptions[O], ExpressionWithOptions<TEntity, TOptions>>
  }

export interface ExportableExpression extends Expression<any> {
  [Introspect]: {
    expr: DataExpression | undefined,
    propPath: string[],
    type: ProxyType
  };
}
