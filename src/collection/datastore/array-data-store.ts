import { DataStore } from "./datastore";
import { ListQuery, ListResponse, Query, GetRequest, MutationRequest } from "../query";
import { createFilter, getKeyExtractor } from "./create-filter";
import { getCompoundSortFunction } from "./orderby";
import { PagingSpec } from "./paging";
import { getComparer } from "../compare";

export class ArrayDataStore implements DataStore {
  private a: any[];

  constructor (a: any[]) {
    this.a = a;
  }

  async list({include, offset, limit, orderBy, pageToken, paging, select, where}: ListQuery): Promise<ListResponse> {
    // How to handle include? Supposely, check if that prop is instance of Collection or Reference, and if so,
    // await that collection's result.
    let result = where ?
      this.a.filter(createFilter(where, {})) :
      this.a.slice(0);
    if (orderBy) {
      result = result.sort(getCompoundSortFunction(orderBy))
    }
    if (pageToken) {
      offset = parseInt(pageToken);
    }
    offset = (offset || 0);
    result = result.slice(offset);
    const useLimit = limit != null && limit != Infinity && limit < result.length;
    const response: ListResponse = useLimit ?
      {result: result.slice(0, limit)} :
      {result}

    if (paging) {
      const pagingSpec = new PagingSpec(paging);
      const pagingResult: ListResponse["paging"] = {};
      if (pagingSpec.next && useLimit) {
        pagingResult.next = ''+(offset + limit!);
      }
      if (pagingSpec.prev && limit != null && offset > 0) {
        pagingResult.prev = ''+Math.max(offset - limit, 0);
      }
      if (pagingSpec.totalPages) {
        pagingResult.totalPages = Math.ceil(this.a.length / (limit || 0));
      }
      response.paging = pagingResult;
    }

    if (select) {
      response.result = response.result.map(entity => {
        const partialEntity: {[propName: string]: any} = {};
        for (const propName of select) {
          partialEntity[propName] = entity[propName];
        }
        return partialEntity;
      })
    }

    return response;
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

  mutate(reqs: MutationRequest[]): Promise<number | undefined> {
    throw new Error ("Not implemented!");
  }
}
