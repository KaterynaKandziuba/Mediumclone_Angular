import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { FollowService } from '../follow.service';
import {
  startFollowingAction,
  startFollowingFailureAction,
  startFollowingSuccessAction,
} from './follow.action';

@Injectable()
export class FollowEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startFollowingAction),
      switchMap(({ isFollowed, slug }) => {
        const profile$ = isFollowed
          ? this.followService.unfollowUser(slug)
          : this.followService.followUser(slug);
        return profile$.pipe(
          map((profile) => {
            return startFollowingSuccessAction({ profile });
          }),
          catchError(() => {
            return of(startFollowingFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private followService: FollowService
  ) {}
}
