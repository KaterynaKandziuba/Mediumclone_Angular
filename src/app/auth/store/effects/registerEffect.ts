import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() => this.actions$.pipe(
        // ми викликаємо усі екшени і далі вибираємо з них тільки реджістер
        ofType(registerAction),
        // деструкнуризуємо дані, дістаємо реквест і засовуємо в сервіс
        switchMap(({request}) => {
            // тут відбувається очікування
            return this.authService.register(request).pipe(
                map((currentUser: CurrentUserInterface): any => {
                    this.persistanceService.set('accessToken', currentUser.token)
                    return registerSuccessAction({currentUser})
                }),
                catchError((errorResponce: HttpErrorResponse): any => {
                    return of(registerFailureAction({errors: errorResponce.error}))
                })
            )
        })
    ))

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
        ofType(registerSuccessAction),
        // тут ми не можемо повернути жодного екшена
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