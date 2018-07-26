import { ListQuery, ListResponse } from "../query";
import { createExpressionFilter } from "./create-expression-filter";
import { getCompoundSortFunction } from "./orderby";
import { PagingSpec } from "./paging";

export async function applyQueryToArray({ include, offset, limit, orderBy, pageToken, paging, select, where }: ListQuery, a: any[]) {
  let result = where ?
    a.filter(createExpressionFilter(where, {})) :
    a.slice(0);
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
    { result: result.slice(0, limit) } :
    { result }

  if (paging) {
    const pagingSpec = new PagingSpec(paging);
    const pagingResult: ListResponse["paging"] = {};
    if (pagingSpec.next && useLimit) {
      pagingResult.next = '' + (offset + limit!);
    }
    if (pagingSpec.prev && limit != null && offset > 0) {
      pagingResult.prev = '' + Math.max(offset - limit, 0);
    }
    if (pagingSpec.totalPages) {
      pagingResult.totalPages = Math.ceil(a.length / (limit || 0));
    }
    response.paging = pagingResult;
  }

  if (select) {
    response.result = response.result.map(entity => {
      const partialEntity: { [propName: string]: any } = {};
      for (const propName of select) {
        partialEntity[propName] = entity[propName];
      }
      return partialEntity;
    })
  }

  return response;
}
