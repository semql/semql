
export const ExprType = Symbol();
export const IsDataType = Symbol();

export type SemQLExpression<TEntity, TOperators extends StandardOperators<TEntity, TEntity>> =
  (entry: EntityProxy<TEntity, TOperators>) => Expression<TEntity, StandardOperators<any, TEntity>>;

export type EntityProxy<T, TOperators extends StandardOperators<T, TEntity>, TEntity=T> =
  T extends string ? OperatorsFor<T, TEntity, TOperators> :
  T extends number ? OperatorsFor<T, TEntity, TOperators> :
  T extends boolean ? OperatorsFor<T, TEntity, TOperators> :
  T extends Date ? OperatorsFor<T, TEntity, TOperators> :
  T extends {[IsDataType]?: true} ? OperatorsFor<T, TEntity, TOperators> :
  TOperators["EntityProxy"];
  //{[P in keyof T]: EntityProxy<T[P], TOperators["PropOperators"][P], TEntity>};

//type OperatorsFor<T, TEntity, TOperatorSet> = {t: T, e: TEntity, op: TOperatorSet, valid: ValidOperatorsForType<T, TOperatorSet>};
type OperatorsFor<T, TEntity, TOperators> = Pick<TOperators, ValidOperatorsForType<T, TOperators>>;
//type ValidOperatorsForType<T, TOperatorSet> = {[K in keyof {apa: 3}]: K}[keyof {apa: 3}];
type ValidOperatorsForType<T, TOperators> =
  {
    [K in keyof TOperators]:
      TOperators[K] extends (...args: any[]) => any ?
        ReturnType<TOperators[K]> extends {[ExprType]: T} ?
          K :
          never :
        never
  }[keyof TOperators];

export interface StandardOperators<T, TEntity> {
  EntityProxy: {[P in keyof T]: EntityProxy<T[P], StandardOperators<T[P], TEntity>, TEntity>}
  Root: StandardOperators<TEntity, TEntity>;
  
  equals(other: T): Expression<TEntity, this, any>;
  above(other: T): Expression<TEntity, this, number & string & any[]>;
  aboveOrEqual(other: T): Expression<TEntity, this, number & string & any[]>;
  below(other: T): Expression<TEntity, this, number & string & any[]>;
  belowOrEqual(other: T): Expression<TEntity, this, number & string & any[] >;
  between(lower: T, upper: T): Expression<TEntity, this, any>;
  anyOf(set: T[]): Expression<TEntity, this, any>;
  startsWith(other: string): Expression<TEntity, this, string>;
  endsWith(other: string): Expression<TEntity, this, string>;
  contains(other: string | RegExp): Expression<TEntity, this, string>;
}

export interface Collection<TEntity, Operators extends StandardOperators<TEntity,TEntity>=StandardOperators<TEntity,TEntity>> {
  where(expression: SemQLExpression<TEntity, Operators>) : Collection<TEntity, Operators>;
  toArray(): Promise<TEntity>;
}


export interface Expression<TEntity, TOperators extends StandardOperators<any,TEntity>, T=any> {
  [ExprType]: T;
  and(expression: SemQLExpression<TEntity, TOperators["Root"]>): Expression<TEntity, TOperators>;
  or(expression: SemQLExpression<TEntity, TOperators["Root"]>): Expression<TEntity, TOperators>;
}

/*export type ExpressionWithTypeTag<TEntity, TOperators extends StandardOperators<any,TEntity>, T> =
  Expression<TEntity, TOperators> &
  {[ExprType]: T};*/

