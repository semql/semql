import { EntityProxy } from "./entity-proxy";
import { createProxy } from "./create-proxy";
import { WhereExpression } from "./where-expression";
import { Introspect } from "../symbols";
import { NOT } from "./not";
import { BooleanExpression, ExportableExpressionProxy } from "./where-expression-proxy";

interface Friend {
  name: string;
  age: number;
  tags?: string[];
  cars?: Car[];
}

interface Car {
  brand: string;
  model?: string;
}

function verify<T>(jsExpr: WhereExpression<T>, expectedResult: any[]) {
  const {expr, propPath, type} = (jsExpr(createProxy<T>()) as ExportableExpressionProxy)[Introspect];
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
      {ignoreCase: true} 
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
    ).AND(cars.every(({ model }) => model.equals("V70").ignoreCase().locale("sv-se")))
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
          {
            "ignoreCase": true
          }
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
          {
            "ignoreCase": true,
            "locale": "sv-se"
          }
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
    "NOT anyOf",
    ["Foo", "Bar"]
  ]);

  verify<Friend>(f => NOT(f.age.above(3).AND(f.age.belowOrEqual(7))), [[
    "age",
    "above",
    3
  ],
  "NOT AND",
  [
    "age",
    "belowOrEqual",
    7
  ]
  ]);


  const prefixes = ["Foo", "Bar", "Apa"];
  verify<Friend>(({name, age}) =>
    prefixes.map(prefix => name.startsWith(prefix)).reduce((res, expr) => res.AND(expr)).ignoreCase(),[
      [
      ["name", "startsWith", "Foo"],
      "AND",
      ["name", "startsWith", "Bar"]
    ],
    "AND",
    [
      "name", "startsWith", "Apa"
    ],
    {"ignoreCase": true}]);
});

test('antiOptions', () => {
  verify<Friend>(({name}) => name.equals("David").ignoreCase().matchCase(), [
    "name",
    "equals",
    "David",
    {matchCase: true}
  ])
});

test ('between', ()=> {
  verify<Friend>(({age}) => age.between(20, 25), [
    "age",
    "between",
    [20, 25]
  ]);
});

test ('some() with item access', ()=> {
  verify<Friend>(f => f.tags.some(tag => tag.startsWith("f")), [
    "tags",
    "some",
    [
      "",
      "startsWith",
      "f"
    ]
  ]);
});
