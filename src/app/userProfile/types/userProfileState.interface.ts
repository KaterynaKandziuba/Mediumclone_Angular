import { ProfileInterface } from 'src/app/auth/shared/types/profile.interface';

export interface UserProfileStateInterface {
  data: ProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}
