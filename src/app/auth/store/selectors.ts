import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../shared/types/appState.interface';
import { AuthStateInterface } from '../types/authState.interface';

// T - global state
// V - local state
export const authFeatureSelector = createFeatureSelector<
  AppStateInterface,
  AuthStateInterface
>('auth');

// якщо ми пишемо селектор для модуля, що всередині, 
// то ми тількі всередині можемо його використовувати
export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmiting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false
)

export const CurrentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
)