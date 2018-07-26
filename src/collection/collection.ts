import { Query, ListQuery } from "./query";
import { DataStore } from "./datastore";
import { JsExpression } from "../core/js-expression";
import { createProxy } from "../core/create-proxy";
import { Introspect } from "../symbols";
import { ExportableExpressionProxy } from "../core/expression-proxy";
import { Expression } from "../core/expression";
import { ChainedDataStore } from "./datastore/chained-data-store";
import { OrderBySpec } from "./datastore/orderby";

export class Collection<TEntity> {
  _dataStore: DataStore;
  _query: ListQuery;

  static get [Symbol.species]() { return this; }

  constructor (dataStore: DataStore, query: ListQuery) {
    this._dataStore = dataStore;
    this._query = query;
  }

  public query(query: ListQuery) : this {
    const {limit, offset, where} = this._query;
    const hasLimitOrOffset = (limit != null && limit !== Infinity) || !offset;
    const Collection = (this.constructor as CollectionConstructor<TEntity>)[Symbol.species];
    if (hasLimitOrOffset) {
      // Limit / offset must be applied on current collection before the query changes
      return new Collection(new ChainedDataStore(this), query) as this;
    } else if (where && query.where) {
      // Make a combo of current where() with new where() using AND operator:
      return new Collection(
        this._dataStore, {...this._query, ...query, where: [where, "AND", query.where]}) as this;
    } else {
      // Just combine the two ("where" is either on previous, current or none of them)
      return new Collection(
        this._dataStore, {...this._query, ...query}
      ) as this;
    }
  }

  where (jsExpression: JsExpression<TEntity>): this {
    const proxy = createProxy<TEntity>();
    const expressionProxy = jsExpression(proxy);
    const introspected = (expressionProxy as ExportableExpressionProxy)[Introspect];
    if (!introspected) throw new Error("Invalid return value from JS expression");
    const expression = introspected.expr;
    return this.query({where: expression});
  }

  orderBy (...properties: (JsExpression<TEntity> | (keyof TEntity))[]): this {
    const orderBy = properties.map(p => typeof p === 'string' ?
      [p, true] :
      [((p as JsExpression<TEntity>)(createProxy<TEntity>()) as ExportableExpressionProxy)[Introspect].propPath])
    return this.query({orderBy: orderBy as OrderBySpec[]})
  }

  select (...properties: (keyof TEntity)[]) {
    return this.query({
      select: properties as string[]
    });
  }

  toArray(): Promise<TEntity[]> {
    return this._dataStore.list(this._query).then(({result}) => result);
  }
}

export interface CollectionConstructor<TEntity=any> {
  new (dataStore: DataStore, query: ListQuery): Collection<TEntity>;
  [Symbol.species]: CollectionConstructor<TEntity>;
}
