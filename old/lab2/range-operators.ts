export interface Range {
  from: number;
  to: number;
}

export function RangeOperators<T>(t: T) : T extends Range ? 