import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {
    getCurrentUser$ = createEffect(() => this.actions$.pipe(
        // ми викликаємо усі екшени і далі вибираємо з них тільки реджістер
        ofType(getCurrentUserAction),
        // деструкнуризуємо дані, дістаємо реквест і засовуємо в сервіс
        switchMap(() => {
            // нам є сенс запитувати юзера только у випадку, 
            // якщо ми маємо токен: в іншому випадку юзер вперше на сайті - 
            // ми не чіпаємо сервер.
            const token = this.persistanceService.get('accessToken');
            if(!token) {
                return of(getCurrentUserFailureAction())
            }
            // тут відбувається очікування
            return this.authService.getCurrentUser().pipe(
                map((currentUser: CurrentUserInterface): any => {
                    // ось тут ми оновили стор
                    return getCurrentUserSuccessAction({currentUser})
                }),
                catchError(() => {
                    return of(getCurrentUserFailureAction())
                })
            )
        })
    ))

    constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService){}
}