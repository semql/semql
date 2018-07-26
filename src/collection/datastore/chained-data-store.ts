import { DataStore } from "./datastore";
import { Collection } from "../collection";
import { ListResponse, ListQuery } from "../query";
import { applyQueryToArray } from "./apply-query-to-array";

export class ChainedDataStore implements DataStore {
  collection: Collection<any>;
  constructor (collection: Collection<any>) {
    this.collection = collection;
  }

  async list(query: ListQuery): Promise<ListResponse> {
    // BUGBUG: Deal with paging correctly!
    const {result} = await this.collection._dataStore.list(this.collection._query);
    // BUGBUG: Deal with paging correctly!
    return applyQueryToArray(query, result);
  }
}
