import { PrimitiveType } from "../utils/primitive-type";
import { getArrayLike } from "../utils/get-array-like";
import { Options } from "../core/options";
import { Expression } from "../core/expression";
import { Collection } from "./collection";
import { createFilter } from "./datastore/create-filter";


export type RegisteredOperator = {
  operator: (lvalue: any, rvalue: any, comparer: (a: any, b: any) => number, options: Options) => boolean;
  typeCheck?: (lvalue: any) => boolean
} | ((lvalue: any, rvalue: any, comparer: (a: any, b:any) => number, options: Options) => boolean);

function startsWith(
  lval: string | Array<PrimitiveType> | ArrayBuffer | ArrayBufferView | DataView,
  rval: string | Array<PrimitiveType> | ArrayBuffer | ArrayBufferView | DataView,
  cmp: (a: any, b: any) => number)
{
  if (typeof lval === 'string' && typeof rval === 'string') {
    // String
    const lLength = lval.length;
    const rLength = rval.length;
    if (lLength < rLength) return false;
    return cmp(lval.substr(0, rLength), rval) === 0;
  }
  const lArray = getArrayLike(lval);
  const rArray = getArrayLike(rval);
  const lLength = lArray.length;
  const rLength = rArray.length;
  if (lLength < rLength) return false;
  if (Array.isArray(lval) && Array.isArray(rval)) {
    // Array
    return cmp(lval.slice(0, rLength), rval) === 0;
  }

  // ArrayBuffer or ArrayBufferView
  for (let i=0; i<rLength; ++i) {
    if (lArray[i] != rArray[i]) return false;
  }
  return true;
}

export const runtimeOperators: {[operatorName: string]: RegisteredOperator[]} = {
  equals: [(lval, rval, cmp) => cmp(lval, rval) === 0],
  above: [(lval, rval, cmp) => cmp(lval, rval) > 0],
  aboveOrEqual: [(lval, rval, cmp) => cmp(lval, rval) >= 0],
  below: [(lval, rval, cmp) => cmp(lval, rval) < 0],
  belowOrEqual: [(lval, rval, cmp) => cmp(lval, rval) <= 0],
  before: [(lval, rval, cmp) => cmp(lval, rval) > 0],
  beforeOrEqual: [(lval, rval, cmp) => cmp(lval, rval) >= 0],
  after: [(lval, rval, cmp) => cmp(lval, rval) < 0],
  afterOrEqual: [(lval, rval, cmp) => cmp(lval, rval) <= 0],
  between: [(lval, [lower, upper], cmp, {excludeBounds, excludeLower, excludeUpper}) => {
    const lowerResult = cmp(lval, lower);
    const upperResult = cmp(lval, upper);
    return (
      (excludeBounds || excludeLower ? lowerResult > 0 : lowerResult >= 0) &&
      (excludeBounds || excludeUpper ? upperResult < 0 : upperResult <= 0)
    );
  }],
  anyOf: [(lval, rvals, cmp) => rvals.some((rval: any) => cmp(lval, rval) === 0)],
  startsWith: [startsWith],
  startWithAnyOf: [
    (lval, rvals: (string | ArrayBuffer | Array<PrimitiveType> | ArrayBufferView | DataView)[], cmp) =>
      rvals.some(rval => startsWith(lval, rval, cmp))
  ],
  some: [(lvals: any[] | Collection<any>, subFilter:(x: any) => boolean) => {
    if (Array.isArray(lvals)) {
      return lvals.some(lval => subFilter(lval));
    }
    throw new Error("Collections in sub expressions not yet supported");
  }],
  every: [(lvals: any[] | Collection<any>, subFilter:(x: any) => boolean) => {
    if (Array.isArray(lvals)) {
      return lvals.every(lval => subFilter(lval));
    }
    throw new Error("Collections in sub expressions not yet supported");
  }],
};


export const subExpressionOperators: {[op: string]: true} = {
  some: true,
  every: true
}
