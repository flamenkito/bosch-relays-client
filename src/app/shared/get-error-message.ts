import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';

export function getErrorMessage(data: any): string {
  if (!environment.production) {
    console.log(data);
  }
  if (data instanceof HttpErrorResponse) {
    return `${data.statusText} (${data.status})`;
  }
  if (data.error) {
    return data.error;
  }
  if (data.message) {
    return data.message;
  }
  return 'Error';
}
