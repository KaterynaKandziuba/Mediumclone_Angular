import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from '../actions/getPopularTags.action';
import { PopularTagsService } from '../services/popularTags.service';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';

@Injectable()
export class GetPopularTagsEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(({ url }) => {
        return this.popularTagsService.getPopularTags(url).pipe(
          map((response: GetPopularTagsResponseInterface) => {
            return getPopularTagsSuccessAction(response);
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
