import { Query, ListQuery } from "./query";
import { DataStore } from "./datastore";
import { JsExpression } from "../core/js-expression";
import { createProxy } from "../core/create-proxy";
import { Introspect } from "../symbols";
import { ExportableExpressionProxy } from "../core/expression-proxy";
import { Expression } from "../core/expression";

export class Collection<TEntity> {
  _dataStore: DataStore;
  _query: ListQuery;

  static get [Symbol.species]() { return this; }

  constructor (dataStore: DataStore, query: ListQuery) {
    this._dataStore = dataStore;
    this._query = {};
  }

  private clone(query: ListQuery) : this {
    return new (this.constructor as CollectionConstructor<TEntity>)[Symbol.species](
      this._dataStore, query) as this;
  }

  where (jsExpression: JsExpression<TEntity>): this {
    const {where} = this._query;
    const proxy = createProxy<TEntity>();
    const introspected = (jsExpression(proxy) as ExportableExpressionProxy)[Introspect];
    if (!introspected) throw new Error("Invalid return value from JS expression");
    const expression = introspected.expr;
    return this.clone({
      ...this._query,
      where: (where ?
        [where, "AND", expression] as Expression :
        expression)
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
