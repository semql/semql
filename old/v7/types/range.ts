import { Comparer } from "../comparer";
import { SemqlOperators, MIN_VALUE, MAX_VALUE, EMPTY_RANGE } from "../symbols";

export class Range<T> {
  from: T | typeof MIN_VALUE | typeof EMPTY_RANGE;
  to: T | typeof MAX_VALUE | typeof EMPTY_RANGE;
  gt?: boolean;
  lt?: boolean;

  constructor(from: T | typeof MIN_VALUE | typeof EMPTY_RANGE, to: T | typeof MAX_VALUE | typeof EMPTY_RANGE) {
    this.from = from;
    this.to = to;
    this.gt = false;
    this.lt = false;
  }

  static emtpy<T>() {
    return new Range<T>(EMPTY_RANGE, EMPTY_RANGE);
  }

  static full<T>() {
    return new Range<T>(MIN_VALUE, MAX_VALUE);
  }

  static below<T>(upperBound: T) {
    return new Range<T>(MIN_VALUE, upperBound).excludeTo();
  }

  static belowOrEqual<T>(upperBound: T) {
    return new Range<T>(MIN_VALUE, upperBound);
  }

  static above<T>(lowerBound: T) {
    return new Range<T>(lowerBound, MAX_VALUE).excludeFrom();
  }

  static aboveOrEqual<T>(lowerBound: T) {
    return new Range<T>(lowerBound, MAX_VALUE);
  }

  static singleValue<T>(value: T) {
    return new Range<T>(value, value);
  }

  static between<T>(lower: T, upper: T) {
    return new Range<T>(lower, upper);
  }

  excludeFrom() {
    this.gt = true;
    return this;
  }

  excludeTo() {
    this.lt = true;
    return this;
  }

  excludeBoth() {
    this.gt = true;
    this.lt = true;
    return this;
  }

  static [Symbol.hasInstance](range: any) {
    // Why this method?
    // It will be used by the SEMQL Resolver, to know what flavour
    // of an operator to use. Example:
    // "includes" operator is defined for Range but also for Array.
    // When JSON-data comes in with "includes" operator applied on
    // an array, it must not use the "includes" operator from Range, 
    // and vice-versa.
    return 'from' in this && 'to' in this;
  }

  [SemqlOperators](cmp: Comparer) {
 
    function includes({from, to, gt, lt}: Range<T>, value: T) {
      if (from === EMPTY_RANGE) return false;
      return (
        gt ?
          cmp(value, from) > 0 :
          cmp(value, from) >= 0
      ) && (
        lt ?
          cmp(value, to) < 0 :
          cmp(value, to) <= 0
      );
    }

    function overlapsWith({from, to, gt, lt}: Range<T>, other: Range<T>) {
      if (from === EMPTY_RANGE || other.from === EMPTY_RANGE) return false;
      return (
        gt && other.gt?
            cmp(other.to, from) > 0 :
            cmp(other.to, from) >= 0 
      ) && (
        lt && other.lt ?
          cmp(other.from, to) < 0 :
          cmp(other.from, to) <= 0
      );
    }

    function overlapsAnyOf(range: Range<T>, rangeSet: Range<T>[]) {
      return rangeSet.some(other => overlapsWith(range, other));
    }

    function overlapsAllOf(range: Range<T>, rangeSet: Range<T>[]) {
      return rangeSet.every(other => overlapsWith(range, other));
    }

    function equals({from, to, gt, lt}: Range<T>, other: Range<T>) {
      return (
        cmp(from, other.from) === 0 &&
        cmp(to, other.to) === 0 &&
        cmp(gt, other.gt) === 0 &&
        cmp(lt, other.lt) === 0
      );
    }

    return {
      equals,
      includes, 
      overlapsWith,
      overlapsAnyOf,
      overlapsAllOf
    };
  }
}
