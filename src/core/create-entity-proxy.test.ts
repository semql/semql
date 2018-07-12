import { EntityProxy } from "./entity-proxy";
import { createProxy } from "./create-entity-proxy";
import { JsExpression } from "./js-expression";
import { Introspect } from "../symbols";
import { NOT } from "./not";
import { Expression, ExportableExpression } from "./expression";

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

function verify<T>(jsExpr: JsExpression<T>, expectedResult: any[]) {
  const {expr, propPath, type} = (jsExpr(createProxy<T>()) as ExportableExpression)[Introspect];
  expect(expr).toEqual(expectedResult);
}

test('create-entity-proxy', () => {

  verify<Friend>(
    friend => friend.age.above(25), [
      "age",
      "above",
      25
    ]);

  verify<Friend>(

    ({ name }) =>
      name.startsWithAnyOf(["D", "Y"]).ignoreCase(),

    [
      "name",
      "startsWithAnyOf",
      ["D", "Y"],
      "ignoreCase"
    ]
  );

  verify<Friend>(({ name, cars }) =>
    name.anyOf(["Arnold", "Hulken"]).AND(
      cars.some(car => car.brand.equals("Volvo"))),

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

  verify<Friend>(({ name, tags, age, cars }) =>

    tags.includes("friend").AND(
      name.equals("Arne").ignoreCase()
    ).AND(cars.every(({ model }) => model.equals("V70").ignoreCase()))
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
    ]);
  verify<Friend>(f => NOT(f.name.anyOf(["Foo", "Bar"])),[
    "name",
    ["NOT", "anyOf"],
    ["Foo", "Bar"]
  ]);

  verify<Friend>(f => NOT(f.age.above(3).AND(f.age.belowOrEqual(7))), [[
    "age",
    "above",
    3
  ],
  ["NOT", "AND"],
  [
    "age",
    "belowOrEqual",
    7
  ]
  ]);


  const prefixes = ["Foo", "Bar", "Apa"];
  verify<Friend>(({name}) =>
    prefixes.map(prefix => name.startsWith(prefix) as Expression<Friend>).reduce((res, expr) => res.AND(expr)),[
      [
      ["name", "startsWith", "Foo"],
      "AND",
      ["name", "startsWith", "Bar"]
    ],
    "AND",
    [
      "name", "startsWith", "Apa"
    ]]);
});
