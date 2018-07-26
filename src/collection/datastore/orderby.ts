import { getKeyExtractor } from "./create-expression-filter";

export const POS_PROPNAME = 0;
export const POS_ASCENDING = 1;
export const POS_COLLATION_NAME = 2;

export type OrderBySpec = ([string] | [string, boolean] | [string, boolean, string]) & {
  [POS_PROPNAME]: string;
  [POS_ASCENDING]?: boolean;
  [POS_COLLATION_NAME]?: string
}

export function getSortFunction (orderBy: OrderBySpec) : (a: any, b: any) => number {
  const [propName, bAscending, collationName] = orderBy;
  const {compare} = new Intl.Collator (collationName);
  const extractKey = getKeyExtractor(propName);
  return (a: any, b:any) => bAscending ?
    compare(extractKey(a), extractKey(b)) :
    compare(extractKey(b), extractKey(a));
}

export function getCompoundSortFunction (orderBySpecs: OrderBySpec[]) {
  return orderBySpecs
    .map(spec => getSortFunction(spec))
    .reduce((prevCompare, nextCompare) => (a: any, b: any) =>
      prevCompare(a, b) || nextCompare(a,b));
}
