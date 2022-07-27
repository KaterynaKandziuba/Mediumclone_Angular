import { Action, createReducer, on } from "@ngrx/store";
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from "./actions/getPopularTags.action";
import { PopularTagsStateInterface } from "./types/PopularTagsState.interface";

const initialState: PopularTagsStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const popularTagsReducer = createReducer(
    initialState,
    on(getPopularTagsAction, (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true
    })),
    on(getPopularTagsSuccessAction, (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        data: action.tags
    })),
    on(getPopularTagsFailureAction, (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        error: 'Something went wrong...'
    }))
)

export function reducers(state: PopularTagsStateInterface, action: Action){
    return popularTagsReducer(state, action)
}