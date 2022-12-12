import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { ArticleService } from '../../article.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/deleteArticle.action';

@Injectable()
export class DeleteArticleEffect {
  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      // ми викликаємо усі екшени і далі вибираємо з них тільки потрібний нам
      // далі ми чекаємо коли стор його задіспатчить
      ofType(deleteArticleAction),
      // деструкнуризуємо дані, дістаємо реквест і засовуємо в сервіс
      switchMap(({ slug }) => {
        return this.articleService.deleteArticle(slug).pipe(
          map((article: ArticleInterface) => {
            // ось тут ми оновили стор
            // effect automatically dispatches this action
            // switchMap returns dispatch action
            return deleteArticleSuccessAction();
          }),
          catchError(() => {
            return of(deleteArticleFailureAction());
          })
        );
      })
    )
  );

  redirectAfterDelete$ = createEffect(
    () => {
      // because we want to be sure that article is actually deleted
      return this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        // just "do something" function
        tap(() => {
          this.router.navigate(['/feed']);
        })
      );
    },
    // щоб не зависла сторінка і жоден екшн не диспатчився
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) {}
}
