import { SemQLExpression } from "../semql-expression";
import { Range } from "../types/range";

interface Friend {
  name: string;
  age: number;
  tags: Set<string>;
  tags2: string[];
  cars: Car[];
}

interface Car {
  brand: string;
  model: string;
  speedRange: Range<number>;
}

function where(expr: SemQLExpression<Friend>) {

}

where(({age, cars, tags, tags2}) => age.above(25)
.AND(age.between(20, 30).excludeBounds().excludeLower().excludeUpper())
.AND(cars.every(car => car.brand.equals("Volvo").ignoreCase()))
.AND(tags.includesAll(["A", "B", "C"]))
.AND(tags2.some(t => t.equals("jkl").ignoreCase()))
.OR(cars.some(car => car.brand.equals("VòLvó").ignoreAccents()))
.AND(cars.some(car => car.speedRange.overlapsWith(Range.between(100, 120))))
)
