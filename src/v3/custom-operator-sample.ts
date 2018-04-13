import { StandardOperators, Expression, IsDataType, EntityProxy } from "./semql";

export interface Range<T> {
  [IsDataType]: true;
  from: T;
  to: T;
}

export interface MyOperators<T, TEntity, TOperators extends StandardOperators<T, TEntity>> {
  //[x:string]: any;
  //EntityProxy: {[P in keyof T]: EntityProxy<T[P], MyOperators<T[P], TEntity>, TEntity>}
  //Root: MyOperators<TEntity, TEntity>;
  
  /*equals(other: T): Expression<TEntity, this, any>;
  above(other: T): Expression<TEntity, this, number & string & any[]>;
  aboveOrEqual(other: T): Expression<TEntity, this, number & string & any[]>;
  below(other: T): Expression<TEntity, this, number & string & any[]>;
  belowOrEqual(other: T): Expression<TEntity, this, number & string & any[] >;
  between(lower: T, upper: T): Expression<TEntity, this, any>;
  anyOf(set: T[]): Expression<TEntity, this, any>;
  startsWith(other: string): Expression<TEntity, this, string>;
  endsWith(other: string): Expression<TEntity, this, string>;
  contains(other: string | RegExp): Expression<TEntity, this, string>;*/
  overlapsWith(other: Range<any>): Expression<TEntity, TOperators, Range<any>>
}

//type Operators<T> = StandardOperators<T,T> & MyOperators<T, T