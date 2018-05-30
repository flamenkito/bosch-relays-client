import { PopupAction } from '@app/core/actions';
import { getErrorMessage } from '@app/shared/get-error-message';

export const showError = error => new PopupAction.Show(getErrorMessage(error));
