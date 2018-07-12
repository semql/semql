import { Expression } from "./expression";

export interface Operators<T, TSemQLExpression> {
  equals(other: T): Expression<TSemQLExpression>;
  startsWith(other: string): Expression<TSemQLExpression>;
  above(other: T): Expression<TSemQLExpression>;
  isTrue(other: boolean): Expression<TSemQLExpression>;
}

export type StringOperators<TSemQLExpression> = Pick<Operators<string, TSemQLExpression>, "equals" | "startsWith">;
export type NumberOperators<TSemQLExpression> = Pick<Operators<number, TSemQLExpression>, "equals" | "above">;
export type BooleanOperators<TSemQLExpression> = Pick<Operators<number, TSemQLExpression>, "equals" | "isTrue">;
export interface ArrayOperators<T, TSemQLExpression, TItem, TItemSemQLExpression> {
  some(expression: TItemSemQLExpression): Expression<TSemQLExpression>;
  includes(item: TItem): Expression<TSemQLExpression>;    
}

export type BasicTypeNames<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends any[] ? "array" :
  T extends object ? "object" :
  "default";

export interface OperatorsPerType {
  string: 'equals' | 'startsWith';
  number: 'equals' | 'above';
  boolean: 'equals' | 'isTrue';
  array: 'equals' | 'some' | 'includes';
}

/*export type StringProxy<T, TExpression, TNext> =
  T extends string ? StringOperators<TExpression> : TNext;*/
