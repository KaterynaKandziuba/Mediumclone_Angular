import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from '../actions/getArticle.action';

@Injectable()
export class GetArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      // тут ми беремо останнє випущене значення і обробляємо його у внутрішньому промісі
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface): any => {
            return getArticleSuccessAction({
              article,
            });
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
