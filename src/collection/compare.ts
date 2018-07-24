import { Options } from "../core/options";
import { getArrayLike } from "../utils/get-array-like";

export const enum Type {
  NUMBER = 100,
  DATE = 200,
  NULL = 300,
  UNDEFINED = 400,
  BOOLEAN = 500,
  STRING = 600,
  BINARY_ARRAY = 700,
  ARRAY = 800,
  UNSUPPORTED = 1000
}

export function getType(x: any) {
  switch(typeof x) {
    case 'string': return Type.STRING;
    case 'number': return Type.NUMBER;
    case 'object': return (
      x === null ? Type.NULL :
      isArray(x) ? Type.ARRAY :
      'byteLength' in x ? Type.BINARY_ARRAY :
      'getTime' in x ? Type.DATE :
      Type.UNSUPPORTED
    );
    case 'boolean': return Type.BOOLEAN;
    case 'undefined': return Type.UNDEFINED;
    default: return Type.UNSUPPORTED;
  }
}

export function getComparer(options: Options): (a: any, b: any) => number {
  let collator: Intl.Collator;// = getIntlCollator(options);
  return function compare(a: any, b: any): number {
    const typeA = getType(a);
    const typeB = getType(b);
    if (typeA !== typeB) return typeB - typeA;
    switch (typeA) {
      // Switch on most common types first (not same as type order, which is defined in the Type enum)
      case Type.STRING: return (collator || (collator = getIntlCollator(options))).compare(a, b);
      case Type.NUMBER: return a < b ? -1 : a > b ? 1 : 0; // Handles Infinity better than just (b - a).
      case Type.DATE: return (b as Date).getTime() - (a as Date).getTime();
      case Type.NULL:
      case Type.UNDEFINED: return 0;
      case Type.BOOLEAN: return a ? b ? 0 : 1 : -1;
      case Type.BINARY_ARRAY: {
        // ArrayBuffer, ArrayBufferView, DataView or SharedArray(?)
        const arrayA = getArrayLike(a);
        const arrayB = getArrayLike(b);
        const length = Math.min(a.length, b.length);
        for (let i=0; i < length; ++i) {
          if (arrayA[i] === arrayB[i]) continue;
          return (arrayA[i] < arrayB[i] ? -1 : 1);
        }
        if (a.length === b.length) return 0;
        return b.length - a.length;
      }
      case Type.ARRAY: {
        for (let i = 0, l = Math.min(a.length, b.length); i < l; ++i) {
          const itemResult = compare(a[i], b[i]);
          if (itemResult === 0) continue;
          return itemResult;
        }
        if (a.length === b.length) return 0;
        return b.length - a.length;
      }
      default: return NaN;
    }
  }
}

const isArray = Array.isArray;

export function getIntlCollator(options: Options): Intl.Collator {
  return new Intl.Collator(options.locale, {
    sensitivity:
      options.ignoreCase && options.ignoreAccent ? "base" :
      options.ignoreCase ? "accent" :
      options.ignoreAccent ? "case" :
      "variant"
  });
}
