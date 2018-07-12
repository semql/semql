import { Range } from "./datatypes";
import { OperatorSet } from "./templated-operators";

declare function getOperatorsFromType<T>(t: T) : T extends number ? "equals" | "above" : "equals";

interface Operators {
  equals(x:any): boolean;
  above(x:any): boolean;
}


declare function getInterfaceProps<T, F extends (t:T) => any>(t: T, f: F) : ReturnType<F>;

var x = getInterfaceProps("", getOperatorsFromType);
type X = typeof x;
type APA = {[P in (keyof Operators) & X]: Operators[P]};
var x2: APA;


export function getOperatorSet<TExtractor extends ()=>any>(extractor: TExtractor) :
  {[P in (keyof Operators) & ReturnType<TExtractor>]: Operators[P]}
{
  throw "";
}

// Lab2:


// Addon does:

type MyTypeMapper<T> =
  T extends Range<any> ? "overlapsWith" | "equals" : // Replace string types with full OperatorSet types.
  "equals"; // Fallback to default1

function myTypeMapper<T>(t: T) : MyTypeMapper<T>{
  throw "";
}

// Library declares:

function semql<TTypeMapper extends (t: any)=>any>(typeMapper: TTypeMapper) {
  return {
    createCollection() {
      return {
        where<T>(t: T) {
          var rv = typeMapper(t);
          return null as any as Pick<Operators, ReturnType<TTypeMapper>>
        }
      }
    }
  }
}

// Addon does:
const createCollection = semql(myTypeMapper);
//createCollection.createCollection().where(3).

