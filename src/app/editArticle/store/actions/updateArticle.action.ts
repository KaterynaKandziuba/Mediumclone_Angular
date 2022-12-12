import { createAction, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { ActionTypes } from '../actionTypes';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ slug: string; articleInput: ArticleInputInterface }>() // передаємо на вхід в нашому put request
);

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
