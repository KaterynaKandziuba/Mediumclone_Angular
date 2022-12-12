import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { EditArticleStateInterface } from '../types/editArticleState.interface';
// T - global state
// V - local state
export const editArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  EditArticleStateInterface
>('editArticle');

// якщо ми пишемо селектор для модуля, що всередині,
// то ми тількі всередині можемо його використовувати
export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
);

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
);

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationErrors
);

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
);
