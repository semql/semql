import { DataExpression, ExpressionWithOptions } from "../core/data-expression";
import { ReplaceReturnType } from "../utils/replace-return-type";

export interface StandardOperators<T, TEntity> {
  equals(value: T): DataExpression<TEntity>;
  above(value: T): DataExpression<TEntity>;
  aboveOrEqual(value: T): DataExpression<TEntity>;
  below(value: T): DataExpression<TEntity>;
  belowOrEqual(value: T): DataExpression<TEntity>;
  between(from: T, to: T): ExpressionWithOptions<TEntity, BetweenOperatorOptions>;
  anyOf(values: T[]): DataExpression<TEntity>;
  noneOf(values: T[]): DataExpression<TEntity>;
  notEqual(value: T): DataExpression<TEntity>;
}

export interface BetweenOperatorOptions {
  excludeLower(): void;
  excludeUpper(): void;
  excludeBounds(): void;
}

/*
where(({ tenantId, acls, name }) =>
  tenantId.equals(tid)
    .AND(acls.includesAnyOf(aclids))
    .AND(name.equals("David").OR(name.equals("Fredrik")))
)

where(item => item.tenantId.equals(tid)
  .AND(item.acls.includesAnyOf(aclids))
  .AND(item.name.equals("David").matchCase()))
*/
/*
where(({name, age, image, tags}) =>
  name.equals("David").matchCase().AND(
    age.aboveOrEqual(65).OR(
    age.belowOrEqual(18)).OR(
    tags.includes("rebate")).OR(
      image.represents("idiot").AND(
      image.represents("man")
    ))
  )
)
*/
