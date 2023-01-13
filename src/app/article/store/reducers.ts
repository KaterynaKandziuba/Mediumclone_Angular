import { ArticleStateInterface } from '../types/articleState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { getArticleAction, getArticleSuccessAction, getArticleFailureAction } from './actions/getArticle.action';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article,
    })
  ),

  on(
    getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),

  // without it we will get the same post even when click on other posts
  on(routerNavigationAction, (): ArticleStateInterface => initialState)
);

export function reducers(state: ArticleStateInterface, action: Action){
    return articleReducer(state, action)
}
