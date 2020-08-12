export interface Subscription {
  unsubscribe(): void;
}

export interface Observer<T> {
  next: (value: T) => void;
  error?: (error: any) => void;
  complete?: (result?: any) => void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): Subscription;
}
