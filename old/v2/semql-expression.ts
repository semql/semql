import { Expression } from "./expression";

export type SemQLExpression<TEntityProxy> =
  (entry: TEntityProxy) => Expression<SemQLExpression<TEntityProxy>>;
