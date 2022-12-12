import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { CreateArticleStateInterface } from '../types/createArticleState.interface';
// T - global state
// V - local state
export const createArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  CreateArticleStateInterface
>('createArticle');

// якщо ми пишемо селектор для модуля, що всередині,
// то ми тількі всередині можемо його використовувати
export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors
);
