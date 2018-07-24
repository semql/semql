import { Collection } from "../collection";
import { ArrayDataStore } from "./array-data-store";

interface Friend {
  name: string;
  age: number;
  tags: string[];
  cars: Car[];
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
  }
]), {});

test("where", async ()=>{
  const son = await c.where(({cars}) => cars.some(car => car.model.startsWith("toy").ignoreCase()))
    .toArray();

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
})