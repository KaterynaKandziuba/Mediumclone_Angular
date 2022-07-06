import { CurrentUserInterface } from '../shared/types/currentUser.interface';
import { BackendErrorsInterface } from './backendErrors.interface';

export interface AuthStateInterface {
  isSubmiting: boolean;
  // щоб мати можливість використовувати спіннер, коли данні підвантажуються
  isLoading: boolean;
  // user може бути не засетаний
  currentUser: CurrentUserInterface | null;
  // ми можемо не знати, чи юзер вже залогінений
  isLoggedIn: boolean | null;
  validationErrors: BackendErrorsInterface | null;
}
