* Generalize operators

* Separate expressions and arguments for caching expressions (VERY optimized SQL mapping!)

* Don't require Collection.where(). Allow library user to just offer a SemQlExpression<TEntity>
  as parameter to any function. The lib-user could then check whether the expression is cached,
  and if so, invoke it with the cached entity proxy to retrieve arguments. Now lib-user has
  an expression in it's favourite language together with a set of arguments.

* Basic architecture (few operators, few Collection methods, translate to object format)

* Some basic unit tests

### Mongo:
```ts
db.friends.where({
  name: "David",
  lastName: "Fahlander",
  age: {$gte: 25}
}).toArray();
```

### SemQL:
```ts
db.friends.where({
  name: "David",
  lastName: "Fahlander",
  age: aboveOrEqual(25)
}).toArray();

```

## OR-queries

### Mongo:
```ts
db.friends.where({
  $or: [{
    name: "David",
  },{
    age: {$gt: 25}
  }]
}).toArray();
```

### SemQL:
```ts
db.friends.where({
  name: "David"
}).or({
  age: above(25)
}).toArray();

```

## Nested AND/OR

### Mongo
```ts
db.friends.where({
  $and: [{
    $or: [{
      name: "David",
    }, {
      age: {$gt: 25}
    }]
  },{
    lastName: "Fahlander"
  }]
}).toArray();
```

## SemQL (new)
```ts
db.friends.where(({name, age, lastName}) => and ([
  or ([
    name.equals("David"),
    age.above(25)
  ]),
  lastName.equals("Fahlander")
]))
```

### SemQL (old):
```ts
db.friends.where({
  or({
    name: "David"
  }, {
    age: above(25)
  })
}).and({
  lastName: "Fahlander"
}).toArray();
```


## Relation query

```ts
db.friends.where({
  cars: {
    $includes:
  }
})
```