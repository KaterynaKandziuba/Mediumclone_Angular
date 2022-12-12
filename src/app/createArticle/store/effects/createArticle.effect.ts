import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { CreateArticleService } from '../../services/createArticle.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from '../actions/createArticle.action';

@Injectable()
export class CreateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      // тут ми беремо останнє випущене значення і обробляємо його у внутрішньому промісі
      switchMap(({ articleInput: ArticleInputInterface }) => {
        return this.createArticleService
          .createArticle(ArticleInputInterface)
          .pipe(
            map((article: ArticleInterface): any => {
              return createArticleSuccessAction({
                article,
              });
            }),
            catchError((errorResponce: HttpErrorResponse): any => {
              return of(
                createArticleFailureAction({ errors: errorResponce.error })
              );
            })
          );
      })
    )
  );

  // ми хочемо перекинути юзера не на хоум пейдж, а на сторінку з постом
  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {
      // avoiding memory leak, nothing to dispatch!
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}
}
