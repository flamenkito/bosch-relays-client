import { IdentityEntry } from '@shared/models';

export interface IdentityMap<T extends IdentityEntry> {
  [key: number]: T;
}

export namespace IdentityMap {
  export function keys<T extends IdentityEntry>(
    imap: IdentityMap<T>
  ): number[] {
    return Object.keys(imap).map(key => Number.parseInt(key));
  }

  export function toArray<T extends IdentityEntry>(imap: IdentityMap<T>): T[] {
    return IdentityMap.keys(imap).map(key => imap[key]);
  }

  export function fromArray<T extends IdentityEntry>(
    items: T[],
    state: IdentityMap<T> = {}
  ): IdentityMap<T> {
    return items.reduce(
      (collection: IdentityMap<T>, item) => {
        return {
          ...collection,
          [item.id]: item
        };
      },
      { ...state }
    );
  }

  export function empty<T extends IdentityEntry>(): IdentityMap<T> {
    return IdentityMap.fromArray([]);
  }
}
