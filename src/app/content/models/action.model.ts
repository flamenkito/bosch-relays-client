export interface ActionModel {
  id: number;
  name: string;
  description: string;
  state: string;
  value: boolean;
  taskId: number;
  relayId: number;
  actionTypeId: number;
  actionDelay: number;
  pulseTime: number;
}
