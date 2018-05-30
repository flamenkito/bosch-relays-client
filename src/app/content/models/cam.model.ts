import { Update } from '@ngrx/entity';

export interface CamModel {
  id: number;
  name: string;
  description: string;
  state: string;
  enabled: boolean;
  synchronized: boolean;
  synchronizedAt: Date;
  // model
  ip: string;
}

export namespace CamModel {
  export function createDefault(): CamModel {
    return {
      id: undefined,
      name: 'Cam',
      description: 'Bosch cam',
      state: 'OK',
      ip: '127.0.0.1',
      enabled: false,
      synchronized: false,
      synchronizedAt: null
    };
  }
}
