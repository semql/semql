import { Options } from "./options";

/** Expression.
 * 
 * Expression is an array, where:
 * 
 *  Position 0 contains the left-value (property name or another expression)
 *  Position 1 contains the operator (such as "AND", "OR, "above", "below", "equals", etc...)
 *  Position 2 contains the right-value (key to compare, or another expression)
 *  Position 3 contains options available for the particular type and operator.
 * 
 */
export type Expression =
  [any, string, any] & // Expression is an array with operator string on position 1.
  (CompareExpression | CombinedExpression); // Positions 0, 2 and ...rest depends on operator.


export const POS_PROPNAME = 0;
export const POS_LEFT_EXPR = 0;
export const POS_OPERATOR = 1;
export const POS_ARGUMENTS = 2;
export const POS_RIGHT_EXPR = 2;
export const POS_OPTIONS = 3;

/** CompareExpression.
 * 
 * Samples of compare-expressions are:
 * 
 *  ["age", "between", [20, 25]]
 *  ["address.city", "startsWith", "S", "ignoreCase"]
 * 
 */
export type CompareExpression = {
  [POS_PROPNAME]: string  // Such as "address.city" or "age"
  [POS_OPERATOR]: string  // Such as "startsWith" or "between"
  [POS_ARGUMENTS]: any | any[] // Such as "Stockholm" or [25, 50]
  [POS_OPTIONS]?: Options // Such as "ignoreCase" or ["excludeUpper", "excludeLower"]
}

/** CombinedExpression.
 * 
 * Sample:
 * 
 *  [
 *    ["age", "between", [20,25]],
 *    "AND",
 *    ["address.city", "startsWith", "S"]
 *  ]
 * 
 */
export type CombinedExpression = {
  [POS_LEFT_EXPR]: Expression
  [POS_OPERATOR]: 'AND' | 'OR' | 'NOT AND' | 'NOT OR'
  [POS_RIGHT_EXPR]: Expression
  [POS_OPTIONS]?: Options // May contain least common denominator of options for contained expressions
}


/*var x = null as any as Expression;

var [lvalue, op, rvalue, ...options] = x;
*/
