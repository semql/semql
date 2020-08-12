import { BooleanExpression } from "./where-expression-proxy";
import { EntityProxy } from "./entity-proxy";

export type WhereExpression<TEntity> =
  (proxy: EntityProxy<TEntity>) => BooleanExpression<TEntity>;
  