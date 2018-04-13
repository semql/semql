import {SemQLCollection} from './collection';
import {Expression} from './expression';
import {StringOperators, NumberOperators, BooleanOperators, ArrayOperators} from './operators';

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<SemQLExpression<TEntity>>;

export type EntityProxy<T, TEntity=T> =
  T extends string ? StringOperators<SemQLExpression<TEntity>> :
  T extends number ? NumberOperators<SemQLExpression<TEntity>> :
  T extends boolean ? BooleanOperators<SemQLExpression<TEntity>> :
  T extends Array<any> ? ArrayOperators<SemQLExpression<TEntity>, SemQLExpression<T[number]>, T, T[number]> :
  {[P in keyof T]: EntityProxy<T[P], TEntity>};

export type CollectionBase<TEntity> = {
  [P in keyof TSchema]: SemQLCollection<TSchema[P], SemQLExpression<TSchema[P]>>;
}

export interface DatabaseBase<TSchema> {
  addon<T>():
}

export type Database<TSchema> = DatabaseBase<TSchema> & ResolvedDatabaseSchema<TSchema>;

interface Friend {
  name: string;
  age: number;
}

const db = null as any as Database<{friends: Friend}>;

//db.friends.where(f => f.age.above(7)).toArray();
//db.friends.where(f => f.name.startsWith("D").and(f => f.age.below(25)));