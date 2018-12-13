Collection i Clare borde ha följande operatorer:

```tsx

export interface Observable<T> {
  subscribe(subscriber: Subscriber): Subscription;
  map<TMapped>(mapper: (value: T) => TMapped): Observable<TMapped>;
  switchMap<TMapped>(mapper: (value: T) => Observable<TMapped>): Observable<TMapped>;
  combineLatest<...TOther, TResult>(...others: Observable<...TOther>[]): Observable<...TOther[]>;
  catch<TMapped>(mapper: (error: Error) => TMapped): Observable<TMapped>;
  loading<TMapped>(mapper: () => TMapped): Observable<TMapped>;
  load(): Promise<T>;
}

export interface ReadonlyCollection<T> extends Observable<Entity<T>[]> {
  first(criteria?): Observable<Entity<T>>;
  where(criteria): this;
  orderBy(orderBySpec): this;
  select<TMapped>(mapper: (t: T) => TMapped): ReadonlyCollection<TMapped>;
  ...
}

export interface Collection<T> extends ReadonlyCollection<T> {
  add (...values: T[]);
  remove (criteria?);
}

export type Entity<T> = T & EntityMethods<T>;

export interface EntityMethods<T> {
  update(updater: Updater<T>);
}


```