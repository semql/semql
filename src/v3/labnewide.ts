const ExprTypeSymbol = Symbol();

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<TEntity>;

type EntityProxy<T, TEntity=T> =
  T extends string ? OperatorsFor<T, TEntity> :
  T extends number ? OperatorsFor<T, TEntity> :
  {[P in keyof T]: EntityProxy<T[P], TEntity>};

//type OperatorsFor<TOp extends {Types: {[P in keyof TOp]: any}}, T, > = Pick<TOp, OperatorsForType<T, keyof TOp["Types"]>>;

type OperatorsFor<T, TEntity> = Pick<Operators<T, TEntity>, Filter<T, Operators, Operators["Types"]>>;
//type Filter<T> = keyof Operators & keyof {[OpName in keyof Operators["Types"]]: Operators["Types"][OpName] extends T ? OpName : never};
type Filter<T, Operators, TTypes> = (keyof Operators) & {[K in keyof TTypes]: TTypes[K] extends T ? K : never}[keyof TTypes];

//type OperatorsForType<T, P extends keyof Operators<any,any>["Types"]> = Operators<any,any>["Types"][P] extends T ? P : never;

interface Expression<TEntity, T=any> {
  [ExprTypeSymbol]: T;
  and(other: SemQLExpression<TEntity>): Expression<TEntity>
}

interface Operators<T=any, TEntity=any> {
  Types: {
    equals: any;
    above: number;
    startsWith: string;
  };
  equals(this: any, other: T): Expression<TEntity>;
  above(this: number, other: number): Expression<TEntity>;
  startsWith(this: string, other: string): Expression<TEntity>; 
}

interface Collection<TEntity> {
  where(expr: SemQLExpression<TEntity>) : Expression<TEntity>;
}

interface Friend {
  name: string;
  age: number;
}

var friends = null  as any as Collection<Friend>;

friends.where(f => f.age.