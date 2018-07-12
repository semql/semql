import { EntityProxy } from "./entity-proxy";
import { createProxy } from "./create-entity-proxy";
import { JsExpression } from "./js-expression";
import { dataExpression } from "../symbols";

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

function verify<T> (jsExpr: JsExpression<T>, expectedResult: any[]) {
  const data = jsExpr(createProxy<T>())[dataExpression];
  expect(data).toEqual(expectedResult);
}

test('create-entity-proxy', ()=>{

  verify<Friend>(
    friend => friend.age.above(25), [
      "age",
      "above",
      25
    ]);

  verify<Friend> (

    ({name}) =>
      name.startsWithAnyOf(["D", "Y"]).ignoreCase(),

    [
      "name",
      "startsWithAnyOf",
      ["D", "Y"],
      "ignoreCase"
    ]
  );

  verify<Friend>(({name, cars}) =>
    name.anyOf(["Arnold", "Hulken"]).AND(
      cars.some(car => car.brand.equals("Volvo"))) ,
      
  [
    [
      "name",
      "anyOf",
      ["Arnold", "Hulken"]    
    ],
    "AND",
    [
      "cars",
      "some",
      [
        "brand",
        "equals",
        "Volvo"
      ]
    ]
  ]);

  verify<Friend>(({name, tags, age, cars}) => 

    tags.includes("friend").AND(
      name.equals("Arne").ignoreCase()
    ).AND(cars.every(({model}) => model.equals("V70").ignoreCase()))
    .AND(age.above(1)), [[[
    [
      "tags",
      "includes",
      "friend"
    ],
    "AND",
    [
      "name",
      "equals",
      "Arne",
      "ignoreCase"
    ]
  ],
  "AND",
  [
    "cars",
    "every",
    [
      "model",
      "equals",
      "V70",
      "ignoreCase"
    ]
  ]
],
"AND",
[
  "age",
  "above",
  1
]
])
});
