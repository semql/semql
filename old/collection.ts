import { Range } from "./datatypes";


export type EntityProxy<TEntity, TProp=TEntity> =
  TProp extends string ? StringOperators<TEntity> :
  TProp extends number ? NumberOperators<TEntity> :
  TProp extends boolean ? BasicOperators<TEntity, boolean> :
  TProp extends Date ? DateOperators<TEntity> :
  TProp extends ArrayBufferLike ? BasicOperators<TEntity, TProp> :
  TProp extends DataView ? BasicOperators<TEntity, TProp> :
  TProp extends ArrayBufferView ? BasicOperators<TEntity, TProp> :
  TProp extends ArrayLike<any> ? ArrayOperators<TEntity, TProp, TProp[number]> :
  TProp extends Range<any> ? RangeOperators<TEntity, TProp, TProp["rangeStart"]> :
  {[P in keyof TProp]: EntityProxy<TEntity, TProp[P]>};

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity>) => Expression<TEntity>;

export class Collection<TEntity> {
  private expression?: Expression<TEntity>;

  constructor(expression?: Expression<TEntity>) {
    this.expression = expression;
  }

  where(expression: SemQLExpression<TEntity>) : Collection<TEntity> {
    return this.expression ?
      new Collection(this.expression.and(expression)) :
      new Collection(expression(createProxy<TEntity>()));
  }

  and(expression: SemQLExpression<TEntity>): Collection<TEntity> {
    return this.where(expression);
  }

  async toArray(): Promise<TEntity[]> {
    throw "";
  }
}


export class Expression<TEntity> {
  constructor (private op: string, private params: any) {
  }
  static from(collection: Collection<any>) {
    return (collection as any).expression;
  }
  and(rightExpr: SemQLExpression<TEntity>) : Expression<TEntity> {
    return new Expression<TEntity>("and",[this, rightExpr(createProxy<TEntity>())]);
  }
}

export function createProxy<TEntity> (propPath?: PropertyKey[]): EntityProxy<TEntity> {
  return new Proxy(new OperatorSet<TEntity, TEntity>(propPath || [] as PropertyKey[]), {
    get(obj, prop) {
      return prop in obj ?
        (obj as any)[prop] :
        new OperatorSet<TEntity, any>(propPath ? [...propPath, prop] : [prop]);
    }
  }) as any as EntityProxy<TEntity>;
}


/*export class ArrayOperators<TEntity, T, TItem> {
  constructor (private propPath: PropertyKey[]) {}
  some(other: SemQLExpression<TItem>): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, other(createProxy<TItem>())])
  }

  /*includes(other: T): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, new Expression<T>("=", [null, other])]);
  }
}*/

export class OperatorSet<TEntity, T, TSubItem=any> {
  constructor (private propPath: PropertyKey[]) {}

  equals(other: T): Expression<TEntity> {
    return new Expression<TEntity>("=", [this.propPath, other]);
  }

  anyOf(other: T[]): Expression<TEntity> {
    return new Expression<TEntity>("anyOf", [this.propPath, other])
  }

  startsWith(other: string): Expression<TEntity> {
    return new Expression<TEntity>("between", [this.propPath, other, other + '\uffff']);
  }

  belowOrEqual(other: T): Expression<TEntity> {
    return new Expression<TEntity>(">=", [this.propPath, other]);
  }

  aboveOrEqual(other: T): Expression<TEntity> {
    return new Expression<TEntity>("<=", [this.propPath, other]);
  }
  
  above(other: T): Expression<TEntity> {
    return new Expression<TEntity>(">", [this.propPath, other])
  }

  below(other: T): Expression<TEntity> {
    return new Expression<TEntity>("<", [this.propPath, other])
  }

  between(arg1: T, arg2: T): Expression<TEntity> {
    return new Expression<TEntity>("between", [this.propPath, arg1, arg2]);
  }

  after(other: T): Expression<TEntity> {
    return new Expression<TEntity>(">", [this.propPath, other])
  }

  before(other: T): Expression<TEntity> {
    return new Expression<TEntity>("<", [this.propPath, other])
  }

  some(other: SemQLExpression<TSubItem>): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, other(createProxy<TSubItem>())])
  }

  includes(needle: TSubItem): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, new Expression<T>("=", [null, needle])]);
  }

  includesAnyOf(needles: TSubItem[]): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, new Expression<T>("anyOf", [null, needles])]);
  }

  containsRange(other: Range<TSubItem>): Expression<TEntity> {
    return new Expression<TEntity>("rangeContainsRange", [this.propPath, other]);
  }

  contains(other: TSubItem): Expression<TEntity> {
    return new Expression<TEntity>("contains", [this.propPath, other]);
  }

  overlapsWith(other: Range<TSubItem> | {0:TSubItem, 1:TSubItem} /* | EntityProxy<any, Range<TSubItem>> */): Expression<TEntity> {
    return new Expression<TEntity>("rangeOverlapsWithRange", [this.propPath, other])
  }
}

export type BasicOperators<TEntity, T> = Pick<OperatorSet<TEntity, T>,
  "equals" |
  "below" |
  "above" |
  "belowOrEqual" |
  "aboveOrEqual" |
  "between"
>;

export type NumberOperators<TEntity, T=number> = Pick<OperatorSet<TEntity, T>,
  "equals" |
  "below" |
  "above" |
  "belowOrEqual" |
  "aboveOrEqual" |
  "between"
>;

export type StringOperators<TEntity> = Pick<OperatorSet<TEntity, string>,
  "equals" |
  "below" |
  "above" |
  "belowOrEqual" |
  "aboveOrEqual" |
  "between" |  
  "startsWith"
>;

export type DateOperators<TEntity> = Pick<OperatorSet<TEntity, Date>,
  "equals" |
  "before" |
  "after" |
  "between"
>;

export type ArrayOperators<TEntity, T, TItem> = Pick<OperatorSet<TEntity, T, TItem>,
  "equals" |
  "between" |
  "some" |
  "includes" |
  "includesAnyOf"
>;

export type RangeOperators<TEntity, T, TItem> = Pick<OperatorSet<TEntity, T, TItem>,
  "equals" |
  "containsRange" |
  "contains" |
  "overlapsWith"
>

/*type OperatorSetOf<TEntity, T> =
  T extends string ? StringOperators<TEntity> :
  T extends Date ? DateOperators<TEntity> :
  T extends Array<any> ? ArrayOperators<TEntity, T, T[number]> :
  BasicOperators<TEntity, T>;*/


interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: Date;
  cars: Car[];
  tags: string[];
  friends: Friend[];
  workHours: Range<number>;
  address: {
    city: string;
    pic: Uint8Array;
  }
}

interface Car {
  brand: string;
  model: string;
}

var friends: Collection<Friend> = new Collection();

const promise = friends.where(f => f.address.city.equals("Stockholm").and(
  f => f.firstName.startsWith("ulla").and(
  f => f.lastName.startsWith("B").and(
  f => f.birthDate.before(new Date("2018-04-08")))).and(
    f => f.cars.some(car => car.model.startsWith("Volv")).and(
      f => f.tags.some(tag => tag.startsWith("apa"))
    )
    )
  ).and(f => f.friends.some(f => f.friends.some(f => f.tags.some(tag => tag.startsWith("a"))))
)).toArray();

friends.where(f => f.age.between(18, 65))
       .where(f => f.firstName.equals("david"))
       .where(({age}) => age.above(7))
       .where(({tags}) => tags.includes("good-friend"))
       .where(f => f.tags.includesAnyOf(["a", "b", "c"]))
       .where(({workHours}) => workHours.overlapsWith([8, 17]))
       //.where(f => f.friends.some(friend => friend.workHours.overlaps(f.workHours)))
       .where(f => f.address.pic.equals(new Uint8Array(0)))
       .where(f => f.cars.some(car => car.model.startsWith("Volv")))
       .where(f => f.friends.some(f => f.firstName.startsWith("D")))
       .where(f => f.birthDate.after(new Date(1970)))
       .where(f => f.address.city.above("a"))
       .where(f => f.lastName.aboveOrEqual("jkl"))
       /*.where({
         firstName: "David",
         age: age => age.above(25).or(age => age.below(20))
       });*/


//friends.where("age").above(7)
friends.where(f => f.age.above(7));

//friends.orderBy(f => f.id).last();
