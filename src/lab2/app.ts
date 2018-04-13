import { RangeOperators, Range } from './range-operators';
import { createCollection } from './collection';
import { DefaultOperators } from './default-operators';

interface Friend {
  id: number;
  name: string;
  age: number;
  workHours: Range;
}

const Collection = createCollection<Friend>(RangeOperators(DefaultOperators));

type Collection = InstanceType<typeof Collection>;
