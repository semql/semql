import { ExpressionProxy } from "./expression-proxy";
import { EntityProxy } from "./entity-proxy";

export type JsExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => ExpressionProxy<TEntity>;
  