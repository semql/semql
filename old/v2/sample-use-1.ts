import {SemQLCollection} from './collection';
import {Expression} from './expression';
import {StringOperators, NumberOperators, BooleanOperators, ArrayOperators} from './operators';

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<SemQLExpression<TEntity>>;


export type EntityProxy<T, TEntity=T> =
  T extends string ? StringOperators<SemQLExpression<TEntity>> :
  T extends number ? NumberOperators<SemQLExpression<TEntity>> :
  T extends boolean ? BooleanOperators<SemQLExpression<TEntity>> :
  T extends Array<any> ? ArrayOperators<T, SemQLExpression<TEntity>,T[number], SemQLExpression<T[number]>> :
  {[P in keyof T]: EntityProxy<T[P], TEntity>};

interface Friend {
  id: number;
  name: string;
  isbestFriend: boolean;
  cars: Car[];
  tags: string[];
}

interface Car {
  brand: string;
}

var friends = null as any as SemQLCollection<Friend, SemQLExpression<Friend>>;

friends.where(f => f.cars.some(car => car.brand.startsWith("Volv"))).toArray();
