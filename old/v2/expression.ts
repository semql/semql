
export interface Expression<TSemQLExpression> {
  and(expression: TSemQLExpression): Expression<TSemQLExpression>;
  or(expression: TSemQLExpression): Expression<TSemQLExpression>;
}
