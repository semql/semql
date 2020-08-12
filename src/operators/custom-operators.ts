import { ExpressionProxy } from "../core/where-expression-proxy";

type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;
type MakeOperatorMethod<TOp, T, TEntity> = TOp extends (thiz: T, a: infer A, b: infer B, c: infer C, d: infer D) => boolean ? (
  IsValidArg<D> extends true ? (arg1: A, arg2: B, arg3: C, arg4: D) => ExpressionProxy<TEntity> :
  IsValidArg<C> extends true ? (arg1: A, arg2: B, arg3: C) => ExpressionProxy<TEntity> :
  IsValidArg<B> extends true ? (arg1: A, arg2: B) => ExpressionProxy<TEntity> :
  IsValidArg<A> extends true ? (arg: A) => ExpressionProxy<TEntity> :
  () => ExpressionProxy<TEntity>
) : never

export type CustomOperators<OpSet, T, TEntity> = {[Op in keyof OpSet]: MakeOperatorMethod<OpSet[Op], T, TEntity>};
