import { DataExpression } from "./data-expression";
import { EntityProxy } from "./entity-proxy";

export type JsExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => DataExpression<TEntity>;
  