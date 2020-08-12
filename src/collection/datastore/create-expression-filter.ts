import { ExpressionJson } from "../../core/expression-json";
import { Options, addOption, combineOptions } from "../../core/options";
import { getComparer } from "../compare";
import { getArrayLike } from "../../utils/get-array-like";
import { PrimitiveType } from "../../utils/primitive-type";
import { runtimeOperators, subExpressionOperators } from "../runtime-operators";

type FilterFunction = (entity: any) => boolean;

export function getKeyExtractor(keyPath: string) {
  const split = keyPath.split('.');
  const {length} = split;
  if (length === 1) {
    return (obj: any) => keyPath ? obj[keyPath] : obj;
  } else {
    return (obj: any) => {
      for (let i=0; i<length; ++i) {
        if (obj == null) return obj;
        obj = obj[split[i]];
      }
      return obj;
    };
  }
}

export function createExpressionFilter (expression: ExpressionJson, opts: Options): FilterFunction {
  const [lvalue, op, rvalue, opts2] = expression;
  const options = opts && opts2 ?
      combineOptions(opts, opts2) :
      opts || opts2 || {};
  if (typeof lvalue === 'string') {
    const extractKey = getKeyExtractor(lvalue);
    const opFns = runtimeOperators[op];
    if (!opFns) throw new Error("Invalid operator " + op);
    const numFns = opFns.length;
    const opers = opFns.map(op => typeof op === 'function' ? {operator: op} : op);
    const comparer = getComparer(options);
    const resoledRvalue = subExpressionOperators[op] ?
      createExpressionFilter(rvalue, options) :
      rvalue;
    return (val: any) => {
      const lvalue = extractKey(val);
      for (let i=0; i<numFns; ++i) {
        const {typeCheck, operator} = opers[i];
        if (!typeCheck || typeCheck(lvalue)) {
          return operator(lvalue, resoledRvalue, comparer, options);
        }
      }
      return false;
    };
  } else {
    const leftFilter = createExpressionFilter(lvalue, options);
    const rightFilter = createExpressionFilter(rvalue, options);
    switch (op) {
      case 'AND': return (val: any) => leftFilter(val) && rightFilter(val);
      case 'NOT AND': return (val: any) => !(leftFilter(val) && rightFilter(val));
      case 'OR': return (val: any) => leftFilter(val) || rightFilter(val);
      case 'NOT OR': return (val: any) => !(leftFilter(val) || rightFilter(val));
      default:
        throw new Error('Bad logical operator: ' + op);
    }
  }
}

