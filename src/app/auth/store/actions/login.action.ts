import { createAction, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { LoginRequestInterface } from '../../shared/types/loginRequest.interface';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { ActionTypes } from '../actionTypes';

export const loginAction = createAction(
    ActionTypes.LOGIN,
    props<{request: LoginRequestInterface}>()
)

export const loginSuccessAction = createAction(
    ActionTypes.LOGIN_SUCCESS,
    props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
    ActionTypes.LOGIN_FAILURE,
    props<{errors: BackendErrorsInterface}>()
)