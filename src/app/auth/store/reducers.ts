import { AuthStateInterface } from '../types/authState.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { registerAction, registerSuccessAction, registerFailureAction } from './actions/register.action';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';
import { getCurrentUserAction, getCurrentUserSuccessAction, getCurrentUserFailureAction } from './actions/getCurrentUser.action';
import { CurrentUserInterface } from '../shared/types/currentUser.interface';

// слідкують за екшенами та змінюють store

export const initialState: AuthStateInterface = {
  isSubmiting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: false,
  validationErrors: null,
};

// робимо редьюсери під окремі фічі
const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmiting: true,
      validationErrors: null // це потрібно, щоб спочатку видалити ті помилки, які вже в нас є
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmiting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmiting: false,
      validationErrors: action.errors
    })
  ), 
  on(
    loginAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isSubmiting: true,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmiting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmiting: false,
      validationErrors: action.errors
    })
  ),
   on(getCurrentUserAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: true,
   })),
   on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser
   })),
   on(getCurrentUserFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    // про всяк випадок, щоб знати, що юзер занульований
    currentUser: null
   })),
);

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
