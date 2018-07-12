import { Expression, ExpressionWithOptions } from "./expression";
import { ReplaceReturnType } from "./replace-return-type";
import { Range } from "./types/range";

export interface StandardOperators<T, TEntity> {
  equals(value: T): Expression<TEntity>;
  above(value: T): Expression<TEntity>;
  aboveOrEqual(value: T): Expression<TEntity>;
  below(value: T): Expression<TEntity>;
  belowOrEqual(value: T): Expression<TEntity>;
  between(from: T, to: T): ExpressionWithOptions<TEntity, BetweenOperatorOptions>;
  anyOf(values: T[]): Expression<TEntity>;
  noneOf(values: T[]): Expression<TEntity>;
  notEqual(value: T): Expression<TEntity>;
  withinRanges(ranges: Range<T>[]): Expression<TEntity>;
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
