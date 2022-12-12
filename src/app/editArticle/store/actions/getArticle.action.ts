import { createAction, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { ActionTypes } from '../actionTypes';

export const getArticleAction = createAction(
  ActionTypes.GET_ARTICLE,
  props<{ slug: string }>() // передаємо на вхід в нашому put request
);

export const getArticleSuccessAction = createAction(
  ActionTypes.GET_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const getArticleFailureAction = createAction(
  ActionTypes.GET_ARTICLE_FAILURE
); // ми не вказуємо еррори, бо не маємо уявлення що отримаємо для GET request
