import { DataStore } from "./datastore";
import { ListQuery, ListResponse, Query, GetRequest, MutationRequest } from "../query";
import { getKeyExtractor } from "./create-expression-filter";
import { getComparer } from "../compare";
import { applyQueryToArray } from "./apply-query-to-array";

export class ArrayDataStore implements DataStore {
  private a: any[];

  constructor (a: any[]) {
    this.a = a;
  }

  list(query: ListQuery): Promise<ListResponse> {
    return applyQueryToArray(query, this.a);
  }

  async count(query: Query): Promise<number> {
    const res = await this.list(query);
    return res.result.length;
  }
  
  async get(req: GetRequest): Promise<any[]> {
    const [getMethod, prop, keys] = req;
    if (prop === ':id') {
      return (keys as number[]).map(key => this.a[key]);
    }
    const extractKey = getKeyExtractor(prop);
    const comparer = getComparer({});

    return keys.map(key => this.a.find(entity => comparer(extractKey(entity), key) === 0));
  }

  mutate(reqs: MutationRequest[]): Promise<Array<number | undefined>> {
    throw new Error ("Not implemented!");
  }
}
