import { CurrentUserInterface } from 'src/app/auth/shared/types/currentUser.interface';

export interface CurrentUserInputInterface extends CurrentUserInterface {
  password: string;
}
