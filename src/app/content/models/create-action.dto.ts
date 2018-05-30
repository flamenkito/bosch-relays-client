export interface CreateActionDto {
  name: string;
  description: string;
  actionTypeId: number;
  relayId: number;
  taskId: number;
  actionDelay: number;
  pulseTime: number;
}

export namespace CreateActionDto {
  export function fromData(data: any) {
    const {
      name,
      description,
      actionTypeId,
      relayId,
      taskId,
      actionDelay,
      pulseTime
    } = data;
    return {
      name,
      description,
      actionTypeId,
      relayId,
      taskId,
      actionDelay,
      pulseTime
    };
  }
}
