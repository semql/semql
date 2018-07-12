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
