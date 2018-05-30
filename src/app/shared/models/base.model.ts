export interface BaseModel {
  id: number;
  name?: string;
  description?: string;
  state?: string;
}

export namespace BaseModel {
  export function sortById<T extends BaseModel>(a: T, b: T): number {
    return a.id - b.id;
  }

  export function sortByName<T extends BaseModel>(a: T, b: T): number {
    return a.name.localeCompare(b.name);
  }

  /**
   * Get an object with properties from 'after' object
   *   different from 'before' object
   *
   * @param after
   * @param before
   * @param keys - keys to compare
   * @param initialState
   */
  export function getUpdates<T extends BaseModel>(
    after: T,
    before: T,
    keys: string[],
    initialState
  ) {
    const { id } = after;
    // reduce changes
    const changes = keys.reduce((state, key: string) => {
      // new or updated
      if (!before || after[key] !== before[key]) {
        return {
          [key]: after[key],
          ...state
        };
      }
      return state;
    }, initialState);
    // return empty object if no updates
    return Object.keys(changes).length > Object.keys(initialState).length
      ? { ...changes, id }
      : {};
  }

  export function getUpdatesArray<T extends BaseModel>(
    afterArray: T[],
    beforeArray: T[],
    keys: string[],
    initialState
  ) {
    return afterArray
      .map(after =>
        BaseModel.getUpdates(
          after,
          beforeArray.find(before => before.id === after.id),
          keys,
          initialState
        )
      )
      .filter(
        changes =>
          Object.keys(changes).length > Object.keys(initialState).length
      );
  }

  export function getDeletedArray<T extends BaseModel>(
    afterArray: T[],
    beforeArray: T[]
  ): number[] {
    return beforeArray
      .filter(before => !afterArray.find(item => item.id === before.id))
      .map(item => item.id);
  }
}
