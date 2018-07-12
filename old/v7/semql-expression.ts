import { Expression } from "./expression";
import { EntityProxy } from "./entity-proxy";

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<TEntity>;
  