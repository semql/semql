export class DefaultOperators<TEntity, T> {
  constructor (protected propPath: PropertyKey[]) {}
  equals(other: T): Expression<TEntity> {
    return new Expression<TEntity>("=", [this.propPath, other]);
  }
}

export class Expression<TEntity> {
  constructor (private op: string, private params: any) {
  }
  static from(collection: Collection<any>) {
    return (collection as any).expression;
  }
  and(rightExpr: SemQLExpression<TEntity>) : Expression<TEntity> {
    return new Expression<TEntity>("and",[this, rightExpr(createProxy<TEntity>())]);
  }
}
