import { CustomOperators } from "../operators/custom-operators";
import { SemqlOperators, CollectionOf, ReferenceTo } from "../symbols";
import { StringOperators } from "../operators/string-operators";
import { StandardOperators } from "../operators/standard-operators";
import { BooleanOperators } from "../operators/boolean-operators";
import { DateOperators } from "../operators/date-operators";
import { PrimitiveType } from "../utils/primitive-type";
import { SequenceOperators } from "../operators/sequence-operators";
import { SetOperators } from "../operators/set-operators";
import { CollectionOperators } from "../operators/collection-operators";
//import { ExtendsOr2 } from "../utils/extends-or";

export type EntityProxy<T, TEntity=T> =
  T extends string ? StringOperators<TEntity> :
  T extends number ? StandardOperators<T, TEntity> :
  T extends boolean ? BooleanOperators<TEntity> :
  T extends Date ? DateOperators<TEntity> :
  T extends ArrayBufferLike ? SequenceOperators<T, TEntity> :
  T extends ArrayBufferView ? SequenceOperators<T, TEntity> :
  T extends ReadonlyArray<PrimitiveType> ? SequenceOperators<T, TEntity> & SetOperators<T[number], TEntity> :
  T extends Set<PrimitiveType> ? T extends Set<infer U> ? SetOperators<U, TEntity> : never :
  T extends {[CollectionOf]?: infer U} ? CollectionOperators<U, TEntity> :
  T extends ReadonlyArray<any> ? CollectionOperators<T[number], TEntity> :
  T extends {[SemqlOperators]?: any} ?
    CustomOperators<ReturnType<T[typeof SemqlOperators]>, T, TEntity> & {[P in keyof T]: EntityProxy<T[P], TEntity>} :
  T extends {[ReferenceTo]?: infer U} ?
    {[P in keyof U]-?: EntityProxy<U[P], TEntity>} :
    {[P in keyof T]-?: EntityProxy<T[P], TEntity>};
