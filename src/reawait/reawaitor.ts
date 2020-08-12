import {Subscription, Observable, Observer} from './observable';

export interface Reawator {
  cache: Map<string, {promise: Promise<any>, round: number}>;
  round: number,
  //usedQueryIdentifiers: Set<string>;
  unsubscribed: boolean;
  subscriptions: Subscription[];
  trigger: ()=>void;
  wrap<T> (fn: (...args: any[]) => Promise<T>, thisCtx: any, args: any[], queryIdentifier: string): Promise<T>;
  wrapObservable<T> (o: Observable<T>, queryIdentifier: string) : Promise<T>;
}

export function reawait<T> (expression: (reAwaitor: Reawator) => Promise<T>): Observable<T> {
  return {
    subscribe(observer: Observer<T>) {
      let isExecuting = false;
      let triggered = true;

      const ctx: Reawator = {
        cache: new Map(),
        round: 1,
        unsubscribed: false,
        subscriptions: [],
        trigger() {
          triggered = true;
          invokeIfTriggeredAndReady();
        },
        wrap(fn, thisCtx, args, queryIdentifier) {
          const cached = this.cache.get(queryIdentifier);
          if (cached) {
            cached.round = this.round;
            return cached.promise;
          }
          const returnValue = Promise.resolve(fn.apply(thisCtx, args));
          this.cache.set(queryIdentifier, {round: this.round, promise: returnValue});
          return returnValue;
        },
        wrapObservable(x, queryIdentifier) {
          const cached = this.cache.get(queryIdentifier);
          if (cached) {
            cached.round = this.round;
            return cached.promise;
          }
          const returnValue = new Promise((resolve, reject) => {
            let initial = true;
            const subscription = x.subscribe({
              next: value => {
                if (initial) {
                  resolve(value);
                } else {
                  this.cache.set(queryIdentifier, {promise: Promise.resolve(value), round: this.round});
                  this.trigger();
                }
                initial = false;
              },
              error: error => {
                if (initial) {
                  reject(error);
                } else {
                  this.cache.set(queryIdentifier, {promise: Promise.reject(error), round: this.round});
                  this.trigger();
                }
              }
            });
            this.subscriptions.push(subscription);
          });
          this.cache.set(queryIdentifier, {promise: returnValue, round: this.round});
          return returnValue;
        }
      };

      function invokeIfTriggeredAndReady() {
        if (triggered && !isExecuting && !ctx.unsubscribed) {
          triggered = false;
          isExecuting = true;
          unsubscribeAll();
          ++ctx.round;
          expression(ctx)
            .then(value => !ctx.unsubscribed && observer.next(value))
            .catch(error => !ctx.unsubscribed && observer.error && observer.error(error))
            .then(()=>{
              // Cleanup unused cached items:
              const newCache = new Map<string, {promise: Promise<any>, round: number}>();
              ctx.cache.forEach(({promise, round}, key) =>
                round === ctx.round && newCache.set(key, {promise, round})
              );
              ctx.cache = newCache;

              // Mark executing state done:
              isExecuting = false;

              // Check if client unsubscribed during exection. If so,
              // complete the unsubscription here finally:
              if (ctx.unsubscribed) {
                unsubscribeAll();
                ctx.cache.clear();
              } else {
                // Re-test if invoke should be called again:
                invokeIfTriggeredAndReady();
              }
            });
          }
      }
      
      function unsubscribeAll() {
        ctx.subscriptions.forEach(s => s.unsubscribe());
        ctx.subscriptions = [];
      }

      invokeIfTriggeredAndReady();

      return {
        unsubscribe() {
          ctx.unsubscribed = true;
          unsubscribeAll();
        }
      };
    }
  }
}


reawait(async ctx => {
  const res = await fetch('a');
  const json = await res.json();
  return {result: json};
}).subscribe({
  next(val) {
    val.result
  }
});

var x = {
  count(query: string, ctx: Reawator) {
    var o = null as any as Observable<number>;
    return ctx.wrapObservable(o, query);
  }
}

/*export class Reawaitor<T> {
  subscriptions: Subscription[] = [];
  //observables: Observable<any>[] = [];
  observers: Observer<T>[] = [];
  expressions: Array<()=>Promise<T>> = [];
  lastResult: T | undefined;

  attach(observable: Observable<any>) {
    this.subscriptions.push(observable.subscribe({next: value => this.observers.forEach(o => o.next(value))}));
  }

  observe(expression: ()=>Promise<T>) {
    this.expressions.push(expression);
    expression().then( // TODO: Tänk: Vilket kommer först? subscribe() eller observe() Ska det spela roll? Hantera båda?
  }

  subscribe(observer: Observer<T>) {
    this.observers.push(observer);
    return {
      unsubscribe: ()=>{
        const pos = this.observers.indexOf(observer);
        if (pos !== -1) {
          this.observers.splice(pos, 1);
        }
        if (this.observers.length === 0) {
          this.subscriptions.forEach(s => s.unsubscribe());
          this.subscriptions = [];
        }
      }
    }
  }
}*/