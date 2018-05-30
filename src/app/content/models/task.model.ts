export interface TaskModel {
  id: number;
  name: string;
  description: string;
  state: string;
  // model
  position: number;
  value: boolean;
  enabled: boolean;
  // belongs to cam
  camId: number;
}

export namespace TaskModel {
  export function equals(
    a: TaskModel,
    b: TaskModel,
    keys: string[] = ['id', 'name', 'description', 'state', 'position', 'camId']
  ) {
    for (const key of keys) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }

  export function createDefault(camId: number): TaskModel {
    return {
      id: undefined,
      name: 'Task',
      description: 'Task description',
      state: 'OK',
      position: 1,
      value: false,
      enabled: false,
      camId,
    };
  }
}
