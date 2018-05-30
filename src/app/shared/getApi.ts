import { environment } from '@env/environment';

export function getApi(...path): string {
  return [environment.api].concat(...path).join('/');
}
