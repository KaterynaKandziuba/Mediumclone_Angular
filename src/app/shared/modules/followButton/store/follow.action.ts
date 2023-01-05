import { createAction, props } from '@ngrx/store';
import { ProfileInterface } from 'src/app/auth/shared/types/profile.interface';
import { ActionTypes } from './actionTypes';

export const startFollowingAction = createAction(
  ActionTypes.START_FOLLOWING,
  props<{ isFollowed: boolean; slug: string }>() // consider to post or delete
);

export const startFollowingSuccessAction = createAction(
  ActionTypes.START_FOLLOWING_SUCCESS,
  props<{ profile: ProfileInterface }>()
);

export const startFollowingFailureAction = createAction(
  ActionTypes.START_FOLLOWING_FAILURE
);
