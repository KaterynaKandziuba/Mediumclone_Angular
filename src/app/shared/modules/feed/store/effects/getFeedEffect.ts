import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { FeedService } from '../../services/feed.service';
import { getFeedAction, getFeedSuccessAction } from '../actions/getFeed.action';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import { getCurrentUserFailureAction } from '../../../../../auth/store/actions/getCurrentUser.action';

@Injectable()
export class GetFeedEffect {
    getFeed$ = createEffect(() => this.actions$.pipe(
        // ми викликаємо усі екшени і далі вибираємо з них тільки реджістер
        ofType(getFeedAction),
        // деструкнуризуємо дані, дістаємо реквест і засовуємо в сервіс
        switchMap(({url}) => {
            return this.feedService.getFeed(url).pipe(
                map((feed: GetFeedResponseInterface) => {
                    // ось тут ми оновили стор
                    return getFeedSuccessAction({feed})
                }),
                catchError(() => {
                    return of(getCurrentUserFailureAction())
                })
            )
        })
    ))

    constructor(private actions$: Actions, private feedService: FeedService){}
}