import { ExpressionProxy, ExpressionProxyWithOptions } from "../core/expression-proxy";
import { StringOperatorOptions } from "./string-operators";
import { JsExpression } from "../core/js-expression";

export interface SetOperators<TItem, TEntity> {
  includes(value: TItem): TItem extends string ?
    ExpressionProxyWithOptions<TEntity, StringOperatorOptions> :
    ExpressionProxy<TEntity>;
  includesAnyOf(values: TItem[]): TItem extends string ?
    ExpressionProxyWithOptions<TEntity, StringOperatorOptions> :
    ExpressionProxy<TEntity>;
  includesAll(values: TItem[]): TItem extends string ?
    ExpressionProxyWithOptions<TEntity, StringOperatorOptions> :
    ExpressionProxy<TEntity>;

  some(expr: JsExpression<TItem>): ExpressionProxy<TEntity>;
  every(expr: JsExpression<TItem>): ExpressionProxy<TEntity>;
}
