import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { UserProfileStateInterface } from '../types/userProfileState.interface';

// T - global state
// V - local state
export const userProfileFeatureSelector = createFeatureSelector<
  AppStateInterface,
  UserProfileStateInterface
>('userProfile');

// якщо ми пишемо селектор для модуля, що всередині,
// то ми тількі всередині можемо його використовувати
export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
);

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.error
);

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.data
);
