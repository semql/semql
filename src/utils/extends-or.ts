export type ExtendsOr2<T, T1, T2> = T extends T1 ? true : T extends T2 ? true : false;
export type ExtendsOr3<T, T1, T2, T3> = T extends T1 ? true :
  T extends T2 ? true :
  T extends T3 ? true :
  false;
