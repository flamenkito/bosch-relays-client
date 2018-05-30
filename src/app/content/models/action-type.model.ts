export interface ActionTypeModel {
  id: number;
  name: string;
  description: string;
  state: string;
  icon: string;
  isPulse: boolean;
  defaultState: boolean;
}

export namespace ActionTypeModel {
  export function getImage(type: ActionTypeModel) {
    return `/assets/${type.name}.svg`;
  }
}
