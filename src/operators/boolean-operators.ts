import { ExpressionProxy, ExpressionProxyWithOptions } from "../core/expression-proxy";

export interface BooleanOperators<TEntity> {
  equals(value: boolean): ExpressionProxy<TEntity>;
  //isTrue(): ExpressionProxy<TEntity>;
  //isFalse(): ExpressionProxy<TEntity>;
}
