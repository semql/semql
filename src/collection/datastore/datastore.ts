import { ListResponse, GetRequest, MutationRequest, Query, ListQuery } from "../query";

export interface DataStore {
  list(query: ListQuery): Promise<ListResponse>;
  count?(query: Query): Promise<number>;
  get?(req: GetRequest): Promise<any[]>;
  mutate?(reqs: MutationRequest[]): Promise<Array<number | undefined>>;
}
