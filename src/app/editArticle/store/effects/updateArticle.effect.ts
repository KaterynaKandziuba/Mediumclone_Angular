import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { UpdateArticleService } from '../../services/editArticle.service';
import {
  updateArticleAction,
  updateArticleSuccessAction,
  updateArticleFailureAction,
} from '../actions/updateArticle.action';

@Injectable()
export class UpdateArticleEffect {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ articleInput: ArticleInputInterface, slug }) => {
        return this.editArticleService
          .updateArticle(slug, ArticleInputInterface)
          .pipe(
            map((article: ArticleInterface): any => {
              return updateArticleSuccessAction({
                article,
              });
            }),
            catchError((errorResponce: HttpErrorResponse): any => {
              return of(
                updateArticleFailureAction({
                  errors: errorResponce.error.errors,
                })
              );
            })
          );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private editArticleService: UpdateArticleService,
    private router: Router
  ) {}
}
