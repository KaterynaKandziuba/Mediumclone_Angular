import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PersistanceService } from '../../services/persistance.service';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action';

@Injectable()
export class LoginEffect {
    login$ = createEffect(() => this.actions$.pipe(
        // ми викликаємо усі екшени і далі вибираємо з них тільки реджістер
        ofType(loginAction),
        // деструкнуризуємо дані, дістаємо реквест і засовуємо в сервіс
        switchMap(({request}) => {
            // тут відбувається очікування
            return this.authService.login(request).pipe(
                map((currentUser: CurrentUserInterface): any => {
                    this.persistanceService.set('accessToken', currentUser.token)
                    // ефект диспатчить успішний логін для редьюсера та оновлює цим стор
                    return loginSuccessAction({currentUser})
                }),
                // ефект диспатчить неуспішний логін для редьюсера та оновлює цим ерори
                catchError((errorResponce: HttpErrorResponse): any => {
                    return of(loginFailureAction({errors: errorResponce.error}))
                })
            )
        })
    ))

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccessAction),
        // тут ми не можемо повернути жодного екшена
        // tap створений для роботи з side-effects
        tap(() => {
            this.router.navigateByUrl('/')
        })
    ), {
        // avoiding memory leak
        dispatch: false
    })

    constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService, 
        private router: Router){}
}