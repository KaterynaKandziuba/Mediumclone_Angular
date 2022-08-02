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
    on(getArticleAction, (state): ArticleStateInterface => ({
        ...state,
        isLoading: true
    })),

    // reducer прийому даних
    on(getArticleSuccessAction, (state, action): ArticleStateInterface => ({
        ...state,
        isLoading: false,
        data: action.article
    })),

    on(getArticleFailureAction, (state): ArticleStateInterface => ({
        ...state,
        isLoading: false
    })),

    // якщо ми переходимо за посиланням, то онулюємо початковий стейт
    // якщо цього не буде, то ми постійно будемо отримувати той самий пост, навіть клікаючи на інші пости
    on(routerNavigationAction, (): ArticleStateInterface => initialState)
)

export function reducers(state: ArticleStateInterface, action: Action){
    return articleReducer(state, action)
}
