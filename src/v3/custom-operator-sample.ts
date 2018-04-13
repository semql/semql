import { StandardOperators, Expression, IsDataType, Collection } from "./semql";

export interface DateRange {
  [IsDataType]?: true;
  from: Date;
  to: Date;
}

export interface RangeOperators {
  overlapsWith(lvalue: DateRange, other: DateRange): boolean;
}

interface Activity {
  name: string;
  age: number;
  period: DateRange;
}

var activities = null as any as Collection<Activity, StandardOperators & RangeOperators>;
activities.where(a => a.period.equals({from: new Date(), to: new Date()}));
activities.where(a => a.period.overlapsWith({from: new Date(), to: new Date()}));
//activities.where(a => a.name.between("", "").or(f => f.age.below()
//activities.where(a => a.name)
//activities.where(a => a.n)