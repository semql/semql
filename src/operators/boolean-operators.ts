import { BooleanExpression, ExpressionProxyWithOptions } from "../core/where-expression-proxy";

export interface BooleanOperators<TEntity> {
  equals(value: boolean): BooleanExpression<TEntity>;
  //isTrue(): ExpressionProxy<TEntity>;
  //isFalse(): ExpressionProxy<TEntity>;
}
