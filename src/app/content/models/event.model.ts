export interface EventModel {
  id: number;
  createdAt: Date;
  latency: number;
  value: boolean;
  done: boolean;
  relayId: number;
  taskId: number;
}
