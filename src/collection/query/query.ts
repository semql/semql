import { Expression } from "../../core/expression";
import { OrderBySpec } from "../datastore/orderby";

export interface Query {
  where?: Expression;
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

export type ListRequest = ["list", string, ListQuery];

export interface ListResponse {
  result: any[];
  paging?: {
    next?: string;
    prev?: string;
    totalPages?: number;
  }
}

export type CountRequest = ["count", string, Query];
export type CountResponse = number;

export type GetRequest = [
  "get",
  string | ":id", // key property (or implicit primary key)
  any[]   // key values
];

export type GetResponse = (any | undefined)[];

/**
 * ["update", "friends", {"where": ["id", "equals", 17], add: {"tags": ["best-friend"]}}]
 */
export type UpdateRequest = ["update", string, {
  where?: Expression;
  set?: {[propName: string]: any};
  add?: {[propName: string]: any[]};
  remove?: {[propName: string]: any[]};
}];
export type UpdateResponse = number;

export type InsertRequest = ["insert-into", string, any[]];
export type InsertResponse = void;

export type UpsertRequest = ["upsert-into", string, any[]];
export type UpsertResponse = void;

export type DeleteRequest = ["delete-from", string, {where: Expression}];
export type DeleteResponse = number;

export type MutationRequest = UpdateRequest | InsertRequest | UpsertRequest | DeleteRequest;
export type MutationResponse = number | undefined;

export function applyExpression(query: Query, expression: Expression): Query {
  return {
    ...query,
    where: query.where ?
      [query.where, "AND", expression] :
      expression
  };
}

