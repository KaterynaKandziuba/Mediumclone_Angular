import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleService as SharedArticleService} from 'src/app/shared/services/article.service';
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from '../actions/getArticle.action';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';

@Injectable()
export class GetArticleEffect {
    getArticle$ = createEffect(() => this.actions$.pipe(
        // ми викликаємо усі екшени і далі вибираємо з них тільки потрібний нам
        // далі ми чекаємо коли стор його задіспатчить
        ofType(getArticleAction),
        // деструкнуризуємо дані, дістаємо реквест і засовуємо в сервіс
        switchMap(({slug}) => {
            return this.sharedArticleService.getArticle(slug).pipe(
                map((article: ArticleInterface) => {
                    // ось тут ми оновили стор
                    return getArticleSuccessAction({article})
                }),
                catchError(() => {
                    return of(getArticleFailureAction())
                })
            )
        })
    ))

    constructor(private actions$: Actions, private sharedArticleService: SharedArticleService){}
}
