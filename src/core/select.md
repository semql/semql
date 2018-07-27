```ts

db.friends
  .where(f => f.tags.includes("best-friend").locale("sv-se"))
  .select("name", "age", "cars")
  //.map(({name, age, cars}) => {name, age, cars})
  .locale("sv-se")  
  .orderBy("firstName", {locale: "sv-se"})
  .orderBy("lastName", {locale: "sv-se"})
  .orderBy("highScore", {reverse: true})
  .reverse()
  .reverse()


```