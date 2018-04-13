
export const IsDataType = Symbol();

export interface StandardOperators {
  equals(lvalue: null, other: null): boolean;
  above(lvalue: null, other: null): boolean;
  below(lvalue: null, other: null): boolean;
  aboveOrEqual(lvalue: null, other: null): boolean;
  belowOrEqual(lvalue: null, other: null): boolean;
  //between(lower: string | number, upper: string | number): boolean;
  startsWith(lvalue: string, other: string): boolean;
  endsWith(lvalue: string, other: string): boolean;
  includes(lvalue: string, other: string): boolean;
}

export interface Collection<TEntity, TOperatorSet=StandardOperators> {
  where(expression: SemQLExpression<TEntity, TOperatorSet>) : Collection<TEntity, TOperatorSet>;
  toArray(): Promise<TEntity>;
}

export interface Expression<TEntity, TOperatorSet> {
  and(expression: SemQLExpression<TEntity, TOperatorSet>): Expression<TEntity, TOperatorSet>;
  or(expression: SemQLExpression<TEntity, TOperatorSet>): Expression<TEntity, TOperatorSet>;
}

export type SemQLExpression<TEntity, TOperatorSet> =
  (entry: EntityProxy<TEntity, TOperatorSet>) => Expression<TEntity, TOperatorSet>;
  
type EntityProxy<T, TOperatorSet, TEntity=T> =
  T extends string ? OperatorsFor<T, TEntity, TOperatorSet> :
  T extends number ? OperatorsFor<T, TEntity, TOperatorSet> :
  T extends boolean ? OperatorsFor<T, TEntity, TOperatorSet> :
  T extends Date ? OperatorsFor<T, TEntity, TOperatorSet> :
  T extends {[IsDataType]?: true} ? OperatorsFor<T, TEntity, TOperatorSet> :
  {[P in keyof T]: EntityProxy<T[P], TOperatorSet, TEntity>};

type OperatorsFor<T, TEntity, TOperatorSet> = Operators<T, TEntity, TOperatorSet, Pick<TOperatorSet, ValidOperatorsForType<T, TOperatorSet>>>;

type ValidOperatorsForType<T, TOperatorSet> = {
  [K in keyof TOperatorSet]:
    TOperatorSet[K] extends (lvalue: infer TypeFilter, ...args: any[]) => any ?
      TypeFilter extends null ?
        K :
        TypeFilter extends T ?
          K :
          never :
      never
}[keyof TOperatorSet];

type Operators<T, TEntity, TOperatorSet, FilteredOperatorSet> = {
  [OpName in keyof FilteredOperatorSet]: MakeMethod<T, TEntity, FilteredOperatorSet, OpName, TOperatorSet>;
}

type MakeMethod<T, TEntity, TFilteredOperatorSet, OpName extends keyof TFilteredOperatorSet, TOperatorSet> =
  /*TFilteredOperatorSet[OpName] extends (lvalue: any, arg1: infer TArg, arg2: infer TArg2) => any ?
    MakeMethod2<TEntity, TOperatorSet, TFilteredOperatorSet[OpName],
      TArg extends null ? T : TArg,
      TArg2 extends null ? T : TArg2> :*/
  TFilteredOperatorSet[OpName] extends (lvalue: any, arg: infer TArg) => any ?
    MakeMethod1<TEntity, TOperatorSet, TFilteredOperatorSet[OpName], TArg extends null ? T : TArg> :
  never;

type MakeMethod1<TEntity, TOperatorSet, Oper extends (lvalue: any, arg: any) => any, TArg> =
  (other: TArg) => Expression<TEntity, TOperatorSet>;

/*type MakeMethod2<TEntity, TOperatorSet, Oper extends (lvalue: any, ...args: any[]) => any, TArg, TArg2> =
  NonAny<TArg> extends NonAny<TArg2> ?
  (...args: TArg[]) => Expression<TEntity, TOperatorSet> :
  (other: TArg) => Expression<TEntity, TOperatorSet>;

type NonAny<T> = {dummy: (a: T) => T};*/

//type X<T> = T extends (arg1: infer T1, arg2: infer T2) => any ? {t1: T1, t2: T2} : {no: true};

/*var x = null as any as X<(x: string) => void>;
x.t2*/