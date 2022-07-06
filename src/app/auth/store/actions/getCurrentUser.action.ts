import { createAction, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { ActionTypes } from '../actionTypes';

// екшн нічого не передає на вхід, бо нам нічого передавати не потрібно
// ми прикріпимо дані задопомогою інтерсепторів
export const getCurrentUserAction = createAction(
    ActionTypes.GET_CURRENT_USER
)

// це те, що ми отримуємо назад - юзера
export const getCurrentUserSuccessAction = createAction(
    ActionTypes.GET_CURRENT_USER_SUCCESS,
    props<{currentUser: CurrentUserInterface}>()
)

// ми не знаємо, які еррори бекенду можуть до нас прийти,
// тому ми не передаємо пропси
export const getCurrentUserFailureAction = createAction(
    ActionTypes.GET_CURRENT_USER_FAILURE,
)
