export interface UpdateActionDto {
  id: number;
  name?: string;
  description?: string;
  actionTypeId?: number;
  actionDelay?: number;
  pulseTime?: number;
}


export namespace UpdateActionDto {
  export function fromData(data: any) {
    const {
      id,
      name,
      description,
      actionTypeId,
      actionDelay,
      pulseTime
    } = data;
    return {
      id,
      name,
      description,
      actionTypeId,
      actionDelay,
      pulseTime
    };
  }
}
