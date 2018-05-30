import { LocalStorageService } from '../../shared/services/local-storage.service';
import { UserService } from './user.service';

export const services = [LocalStorageService, UserService];

export * from './user.service';
export * from './local-storage.service';
