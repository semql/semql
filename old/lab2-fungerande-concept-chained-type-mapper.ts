//type TTypeMapper<T,U> = {fromType:T, toType: U};

export type TypeMapper<T,TM extends (t:T)=>any> = ReturnType<TM>;

type MyTypeMapper<Next extends (t:T)=>any, T> = (t: T) =>
  T extends string ? {string: T} :
  T extends number ? {number: T} :
  T extends any[] ? {array: T} :
  ReturnType<Next>;

type DefaultTypeMapper<T> = (t:T) => T extends Date ? {date: T} : {default: any};

//var x: TypeMapper<string, MyTypeMapper<DefaultTypeMapper<string>, string>>;

type BooleanAddonMapper<Next extends (t:T)=>any, T> = (t:T) =>
  T extends boolean ? {bool: T} :
  ReturnType<Next>;

declare function mapType<T>(t:T):ReturnType<MyTypeMapper<DefaultTypeMapper<T>,T>>;

type MapType<T> = ReturnType<BooleanAddonMapper<MyTypeMapper<DefaultTypeMapper<T>,T>, T>>;

var x: MapType<boolean>;

