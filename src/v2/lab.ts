import {SemQLCollection} from './collection';
import {Expression} from './expression';
import {Operators, BasicTypeNames, OperatorsPerType, ArrayOperators, StringOperators, NumberOperators, BooleanOperators} from './operators';

export type IsRecursive<T> =
  T extends string ? false :
  T extends number ? false :
  T extends boolean ? false :
  T extends Date ? false :
  T extends ArrayLike<any> ? false :
  true;

export type MappedOperatorSet<T, TSemQLExpression, TItem=any, TITemSemQLExpression=any> =
  T extends string ? StringOperators<TSemQLExpression> :
  T extends number ? NumberO

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<SemQLExpression<TEntity>>;

export type EntityProxy<T, TEntity=T> =
T extends string ? StringOperators<SemQLExpression<TEntity>> :
T extends number ? NumberOperators<SemQLExpression<TEntity>> :
T extends boolean ? BooleanOperators<SemQLExpression<TEntity>> :
T extends Array<any> ? ArrayOperators<T, SemQLExpression<TEntity>,T[number], SemQLExpression<T[number]>> : never;
