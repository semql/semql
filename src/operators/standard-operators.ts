import { ExpressionProxy, ExpressionProxyWithOptions } from "../core/expression-proxy";
import { ReplaceReturnType } from "../utils/replace-return-type";

export interface StandardOperators<T, TEntity> {
  equals(value: T): ExpressionProxy<TEntity>;
  above(value: T): ExpressionProxy<TEntity>;
  aboveOrEqual(value: T): ExpressionProxy<TEntity>;
  below(value: T): ExpressionProxy<TEntity>;
  belowOrEqual(value: T): ExpressionProxy<TEntity>;
  between(from: T, to: T): ExpressionProxyWithOptions<TEntity, BetweenOperatorOptions>;
  anyOf(values: T[]): ExpressionProxy<TEntity>;
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
