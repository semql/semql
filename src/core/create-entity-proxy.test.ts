import { EntityProxy } from "./entity-proxy";
import { createProxy } from "./create-entity-proxy";
import { JsExpression } from "./js-expression";
import { dataExpression } from "../symbols";

interface Friend {
  name: string;
  age: number;
}

//test('create-entity-proxy', ()=>{

  const expression: JsExpression<Friend> = ({name, age}) =>
    age.above(25).AND(name.startsWith("D").ignoreAccents().ignoreCase())
    .OR(age.noneOf([1,2,3]).AND(name.notEqual("APA")))

  const proxy = createProxy<Friend>();
  const dataExpr = expression(proxy);
  debugger;
  const de = dataExpr[dataExpression];
  debugger;
  console.log(JSON.stringify(de, null, 2));
  //const x =1, y=1;
  //expect(x).toBe(y);

//});