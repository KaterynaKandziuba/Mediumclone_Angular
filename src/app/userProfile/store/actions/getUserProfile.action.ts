import { createAction, props } from '@ngrx/store';
import { ProfileInterface } from 'src/app/auth/shared/types/profile.interface';
import { ActionTypes } from '../actionTypes';

export const getUserProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{ slug: string }>() // тут вказали, що передаємо
);

export const getUserProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{ userProfile: ProfileInterface }>() // тут вказали, що отримуємо
);

export const getUserProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE
);
