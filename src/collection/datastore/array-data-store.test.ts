import { Collection } from "../collection";
import { ArrayDataStore } from "./array-data-store";
import { ListQuery } from "../query";
import { OrderBySpec } from "./orderby";

interface Friend {
  name: string;
  age: number;
  tags?: string[];
  cars?: Car[];
  address?: {
    city: string;
    street: string;
  }
}

interface Car {
  brand: string;
  model: string;
}


const c = new Collection<Friend>(new ArrayDataStore([
  {
    name: "David",
    age: 44,
    tags: ["self", "coder", "musician"],
    cars: [
      {
        brand: "Volvo",
        model: "V70"
      }
    ]
  },
  {
    name: "Ylva",
    age: 43,
    tags: ["wife", "cute", "lovable"],
    cars: [
      {
        brand: "Volvo",
        model: "V70"
      }
    ]
  }, {
    name: "Simon",
    age: 5,
    tags: ["son", "marvellous", "intelligent"],
    cars: [
      {
        brand: "Brio",
        model: "Toy car 1"
      },
      {
        brand: "Brio",
        model: "Toy car 2"
      }
    ]
  }, {
    name: "Tyra",
    age: 2,
    tags: ["daughter", "cutie"],
    cars: [
      {
        brand: "Biltema",
        model: "Small wodden #1"
      },
      {
        brand: "Biltema",
        model: "Small wodden #2"
      }
    ]
  }, {
    name: "Örjan",
    age: 55,
  }
]), {});

/*function test(name: string, fn: Function) {
  fn();
}*/

test("where", async ()=>{
  const sonColl = c.where(({cars}) => cars.some(car => car.model.startsWith("toy").ignoreCase()));
  expect(sonColl._query).toEqual({
    where: ["cars", "some", ["model", "startsWith", "toy", {ignoreCase: true}]]
  });
  const son = await sonColl.toArray();
  expect(son).toEqual([
    {
      name: "Simon",
      age: 5,
      tags: ["son", "marvellous", "intelligent"],
      cars: [
        {
          brand: "Brio",
          model: "Toy car 1"
        },
        {
          brand: "Brio",
          model: "Toy car 2"
        }
      ]
    }
  ])
});

test ("orderBy-ascending-locale-en-us", async ()=>{
  /*const ordered1 = await c.query({
    orderBy: [["name", true, "en-us"]],
    select: ["name"]
  }).toArray();*/
  //debugger;
  //c.orderBy(f => f.address.city)
  c.orderBy("name").orderBy({address:"street"})
  const ordered1 = await c.orderBy("name").select("name").toArray();
  //debugger;
  expect(ordered1).toEqual([
    {name: "David"},
    {name: "Örjan"},
    {name: "Simon"},
    {name: "Tyra"},
    {name: "Ylva"},
  ]);
});

test ("orderBy-descending-locale-en-us", async ()=>{
  const orderedQuery: ListQuery = {
    orderBy: [["name", false, "en-us"]],
    select: ["name"]
  };
  const ordered1 = await c.query(orderedQuery).toArray();
  expect(ordered1).toEqual([
    {name: "Ylva"},
    {name: "Tyra"},
    {name: "Simon"},
    {name: "Örjan"},
    {name: "David"},
  ]);
});
