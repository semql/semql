/*interface OperatorTypes<T> {
  equals: T;
  startsWith: T extends string ? T : false;
  above: T;
  some: T extends ArrayLike<any> ? T[number] : false;
}

type OperatorForType<T> = {[Operator in keyof OperatorTypes<T>]: };
//const yy;

const yy: ReturnType<()=>string[]>;
*/

type DefaultMapper<TEntity,TProp> =
  TProp extends string ? StringOperators<TEntity> :
  TProp extends number ? BasicOperators<TEntity, number> :
  TProp extends Date ? DateOperators<TEntity> :
  TProp extends ArrayLike<any> ? ArrayOperators<TEntity, TProp, TProp[number]> :
  TProp extends boolean ? BasicOperators<TEntity, boolean> :
  false;

export type EntityProxy<TEntity, TProp, TMapper=DefaultMapper<TEntity, TProp>> = DefaultMapper<TEntity, TProp> extends false ?
  {[P in keyof TProp]: EntityProxy<TEntity, TProp[P], TMapper>} :
  DefaultMapper<TEntity, TProp>;

export type SemQLExpression<TEntity> =
  (entry: EntityProxy<TEntity, TEntity>) => Expression<TEntity>;

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

export function createProxy<TEntity> (propPath?: PropertyKey[]): EntityProxy<TEntity, TEntity> {
  return new Proxy(new OperatorSet<TEntity, TEntity>(propPath || [] as PropertyKey[]), {
    get(obj, prop) {
      return prop in obj ?
        (obj as any)[prop] :
        new OperatorSet<TEntity, any>(propPath ? [...propPath, prop] : [prop]);
    }
  }) as any as EntityProxy<TEntity, TEntity>;
}


export class ArrayOperators<TEntity, T, TItem> {
  constructor (private propPath: PropertyKey[]) {}
  some(other: SemQLExpression<TItem>): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, other(createProxy<TItem>())])
  }

  /*includes(other: T): Expression<TEntity> {
    return new Expression<TEntity>("some", [this.propPath, new Expression<T>("=", [null, other])]);
  }*/
}

export class OperatorSet<TEntity, T> {
  constructor (private propPath: PropertyKey[]) {}

  equals(other: T): Expression<TEntity> {
    return new Expression<TEntity>("=", [this.propPath, other]);
  }

  startsWith(other: string): Expression<TEntity> {
    return new Expression<TEntity>("between", [this.propPath, other, other + '\uffff']);
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
}

export type BasicOperators<TEntity, T> = Pick<OperatorSet<TEntity, T>,
  "equals" |
  "above" |
  "below" |
  "between"
>;

export type StringOperators<TEntity> = Pick<OperatorSet<TEntity, string>,
  "equals" |
  "above" |
  "below" |
  "between" |  
  "startsWith"
>;

export type DateOperators<TEntity> = Pick<OperatorSet<TEntity, Date>,
  "equals" |
  "before" |
  "after" |
  "between"
>;



type OperatorSetOf<TEntity, T> =
  T extends string ? StringOperators<TEntity> :
  T extends Date ? DateOperators<TEntity> :
  T extends Array<any> ? ArrayOperators<TEntity, T, T[number]> :
  BasicOperators<TEntity, T>;


interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  birthDate: Date;
  cars: Car[];
  tags: string[];
  friends: Friend[];
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

friends.where(f => f.firstName.equals("david"))
       //.where(f => f.address.pic.some(byte => byte.))
       .where(f => f.cars.some(car => car.model.startsWith("Volv")))
       .where(f => f.friends.some(f => f.firstName.startsWith("D")))
       .where(f => f.birthDate.after(new Date(1970)))
       .where(f => f.address.city.above("a"));


//friends.where("age").above(7)
friends.where(f => f.age.above(7));

//friends.orderBy(f => f.id).last();
