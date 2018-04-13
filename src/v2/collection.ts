
export interface SemQLCollection<TEntity, TSemQLExpression> {
  where(expression: TSemQLExpression) : SemQLCollection<TEntity, TSemQLExpression>;
  and(expression: TSemQLExpression) : SemQLCollection<TEntity, TSemQLExpression>;
  or(expression: TSemQLExpression) : SemQLCollection<TEntity, TSemQLExpression>;
  toArray(): Promise<TEntity>;
}
