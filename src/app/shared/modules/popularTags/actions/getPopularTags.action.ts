import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';

export const getPopularTagsAction = createAction(
    ActionTypes.GET_POPULAR_TAGS, 
    props<{url: string}>()
)

export const getPopularTagsSuccessAction = createAction(
    ActionTypes.GET_POPULAR_TAGS_SUCCESS, 
    props<GetPopularTagsResponseInterface>()
)

export const getPopularTagsFailureAction = createAction(
    ActionTypes.GET_POPULAR_TAGS_FAILURE
)