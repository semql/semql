import { DataStore } from "./datastore";
import { ListQuery, ListResponse, Query, GetRequest, MutationRequest } from "../query";

export class ArrayDataStore implements DataStore {
  private a: any[];

  constructor (a: any[]) {
    this.a = a;
  }

  list({include, offset, limit, orderBy, pageToken, paging, select, where}: ListQuery): Promise<ListResponse> {
    // How to handle include? Supposely, check if that prop is instance of Collection or Reference, and if so,
    // await that collection's result.
    
  }

  count({where, offset, limit, pageToken}: Query): Promise<number> {
    
  }
  
  get(req: GetRequest): Promise<any[]> {

  }

  mutate(reqs: MutationRequest[]): Promise<number | undefined> {

  }
}