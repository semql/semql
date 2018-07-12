```ts
db.docs.where(({customer, name}) => allIsTrue([
  customer.equals(custName),
  someIsTrue(
    searchNames.map(searchName => name.startsWith(searchName))
  )
]))
```

## Simpla exempel

```ts
db.friends.where(({age}) => age.above(30)).toArray();

db.friends.where(({customer, name, age, cars}) => and([
  customer.equals("Scania"),
  not(age.above(30)),
  name.startsWith("D"),
  cars.some(car => car.brand.equals("Volvo").ignoreCase())
])).toArray();

const friends = await db.friends.where({
  customer: "Scania",
  age: {$gt: 30},
  name: /^D/,
  cars: some(car => car.brand.equals("Volvo"))
}).toArray();
```

## AST (compiled) format
```js
db.docs.query({
  expr: [
    "AND", [
      ["EQUALS", "customer", "Scania", ["ignoreCase"]],
      ["NOT", ["ABOVE", "age", 30]],
      ["STARTSWITH", "name", "D"],
      ["SOME", "cars", [
        "EQUALS", "brand", "Volvo"
      ]]
    ]
  ],
  limit: 3,
  orderBy: {
    keyPaths: ["address.city"],
    reverse: false
    //locale: "sv",
    //caseFirst: "lower",
  }
}).toArray();
```

## Full Text
```ts
//db.docs.where(d => allIsTrue(searchPhrases.map(phrase =>
  //d.textPhrases.some(textPhrase => textPhrase.equals(phrase)))))
db.docs.where(doc => doc.hasText(`"Best friend" Simon`).locale('sv-se').caseSensitive())
```

## Krypterade fält
```ts
interface Friend {
  id: number;
  name: string;
  salary: Encrypted<number, "masterkey">;
  salaryLevel: SaltedHash<number, "masterkey">;
  password: SaltedHash<string, "masterkey">;
  favouriteFoods: SaltedHash<string, "userkey">[];
  notes: StrongEncrypted<string, "userkey">;
}

db.friends.where(({password}) => password.digest.equals("8dhodohfousfyoew8fouj"))...
db.friends.where(({salaryLevel}) => salaryLevel.anyOf(10,20,30)) // ej above eller below!
db.friends.where(({salaryLevel}) => salary.decrypt().above(40))

```
