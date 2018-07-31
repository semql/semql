import { ReadonlyCollection } from './readonly-collection';
import { createExpressionFilter } from './datastore/create-expression-filter';

export class Collection<TEntity> extends ReadonlyCollection<TEntity> {
  static get [Symbol.species]() { return this; }

  async bulkInsert(entities: TEntity[]): Promise<void> {
    if (this._query.where) {
      const filter = createExpressionFilter(this._query.where, {});
      const notWithinFilter = entities.filter(e => !filter(e));
      if (notWithinFilter.length > 0) {
        // THOUGHTS: Think about the use cases:
        // 1: Access Control. where clause demands some accepted aclids (where(x => x.aclids.anyOf(aclids)))
        //    Could we have a default aclid here? Or should this type of filtering only occur in the backend?
        // 2: Relational: Friend.cars is a collection where (car => car.friend.id.equals(friend.id))
        //    Since it is a specific value required, should we fill it in for the user?
        if (notWithinFilter.length === 1) {
          // TODO: Create specific Error type and name.
          throw new Error(`Entity would not pass collection's where clause: ${JSON.stringify(notWithinFilter[0])}`);
        } else {
          throw new Error(`Entities would not pass collection's where clause: ${JSON.stringify(notWithinFilter)}`);
        }
      }
    }
    await this._dataStore.mutate!([{op: 'insert', entities}]);
  }

  async insert(entity: TEntity): Promise<void> {
    await this.bulkInsert([entity]);
  }

  async bulkDelete(keys: any[]): Promise<number> {
    const res = await this._dataStore.mutate!([{op: 'delete', keys, where: this._query.where}]);
    return res[0] as number;
  }

  async delete(key: any): Promise<boolean> {
    const res = await this.bulkDelete([key]);
    return res > 0;
  }
}
