import { ExpressionJson } from "../../core/expression-json";
import { OrderBySpec } from "../datastore/orderby";

export interface Query {
  where?: ExpressionJson;
  limit?: number;
  offset?: number;
  pageToken?: string;
}

export interface ListQuery extends Query {
  select?: string[];
  include?: Array<[
    string, // property name (related property)
    undefined | ListQuery // 
  ]>;
  orderBy?: OrderBySpec[];
  paging?: Array<'next' | 'prev' | 'totalPages'>;
}

//export type ListRequest = ["list", string, ListQuery];

export interface ListResponse {
  result: any[];
  paging?: {
    next?: string;
    prev?: string;
    totalPages?: number;
  }
}

//export type CountRequest = ["count", string, Query];
//export type CountResponse = number;

export type GetRequest = [
  "get",
  string | ":id", // key property (or implicit primary key)
  any[]   // key values
];

export type GetResponse = (any | undefined)[];

/**
 * ["update", "friends", {"where": ["id", "equals", 17], add: {"tags": ["best-friend"]}}]
 */
export type UpdateRequest = {
  op: "update",
  where?: ExpressionJson;
  keys?: any[];
  set?: {[propName: string]: any};
  add?: {[propName: string]: any[]};
  remove?: {[propName: string]: any[]};
};

export type UpdateResponse = number;

export type InsertRequest = {
  op: "insert";
  entities: any[];
}

export type InsertResponse = void;

export type UpsertRequest = {
  op: "upsert";
  where?: ExpressionJson;
  entities: any[];
}

export type UpsertResponse = void;

export type DeleteRequest = {
  op: "delete";
  where?: ExpressionJson;
  keys?: any[];
};

export type BulkDeleteResponse = number;

export type MutationRequest = UpdateRequest | InsertRequest | UpsertRequest | DeleteRequest;
export type MutationResponse = number | undefined;

