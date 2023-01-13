import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getFeedAction } from '../store/actions/getFeed.action';
import { Observable, Subscription } from 'rxjs';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';
import { isLoadingSelector, errorSelector, feedSelector } from '../store/selectors';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {parseUrl, stringify} from 'query-string'

@Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges{
    @Input('apiUrl') apiUrlProps: string;

    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;
    feed$: Observable<GetFeedResponseInterface | null>;
    limit = environment.limit;
    baseUrl: string;
    queryParamsSubscription: Subscription;
    currentPage: number;

    constructor(private store: Store, private router: Router, private route: ActivatedRoute){}

    ngOnInit(): void {
        this.initializeValues()
        this.initializeListeners()
        console.log('baseUrl', this.router.url) // shows url with query parameters
    }

    ngOnDestroy(): void {
        // most common memory leak
        this.queryParamsSubscription.unsubscribe();
    }

    // checks data-bound properties
    ngOnChanges(changes: SimpleChanges): void {
        // just for case when we changed api url
        const isApiChanged = !changes['apiUrlProps'].firstChange && changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue;
        console.log('changes', changes);
        console.log(isApiChanged)

        if(isApiChanged){
            this.fetchFeed();
        }
    }

    initializeValues(): void {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.feed$ = this.store.pipe(select(feedSelector))
        this.baseUrl = this.router.url.split('?')[0]
    }

    fetchFeed(): void {
      const offset = this.currentPage * this.limit - this.limit;
      const parsedUrl = parseUrl(this.apiUrlProps); // object with query and url
      console.log('parsedUrl', parsedUrl);
      const stringifiedParams = stringify({
        limit: this.limit,
        offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
    }

    initializeListeners(): void {
        // router automatically unsibscribe, async pipe too
        // but better unsubscribe - always
        // unsibscribe disposes the resources held by subscription
        this.queryParamsSubscription = this.route.queryParams.subscribe(
          (params: Params) => {
            this.currentPage = Number(params['page'] || '1'); // 1 for case if no params
            this.fetchFeed();
          }
        );
    }
}
