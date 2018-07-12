import { Expression } from "./expression";
import { EntityProxy } from "./entity-proxy";

export type JsExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<TEntity>;
  