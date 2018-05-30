export interface ValueUpdateModel {
  id: string;
  changes: {
    value: boolean;
  };
}

export namespace ValueUpdateModel {
  export function fromData(data: any): ValueUpdateModel {
    const { id, value } = data;
    return {
      id: String(id),
      changes: {
        value
      }
    };
  }
}
