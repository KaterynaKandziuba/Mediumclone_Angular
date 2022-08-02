import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { ArticleStateInterface } from '../types/articleState.interface';

// T - global state
// V - local state
export const articleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  ArticleStateInterface
>('feed');

// якщо ми пишемо селектор для модуля, що всередині,
// то ми тількі всередині можемо його використовувати
export const isLoadingSelector = createSelector(
  articleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isLoading
);

export const errorSelector = createSelector(
  articleFeatureSelector,
    (articleState: ArticleStateInterface) => articleState.error
);

export const feedSelector = createSelector(
  articleFeatureSelector,
    (articleState: ArticleStateInterface) => articleState.data
);
