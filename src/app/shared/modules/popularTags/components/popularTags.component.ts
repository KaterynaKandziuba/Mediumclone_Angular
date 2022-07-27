import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AppStateInterface } from "src/app/auth/shared/types/appState.interface";
import { PopularTagsType } from "src/app/shared/types/popularTags.type";
import { environment } from "src/environments/environment";
import { getPopularTagsAction } from "../actions/getPopularTags.action";
import { PopularTagsStateInterface } from "../types/PopularTagsState.interface";

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popularTags.component.html'
})
export class PopularTagsComponent implements OnInit{
    popularTags$: Observable<PopularTagsType[] | null>;
    isLoading$: Observable<boolean>;
    error$: Observable<string | null>;

    constructor(private store: Store){};

    ngOnInit(): void {
        this.initializeValues();
        this.fetchPopularTags();
    }

    initializeValues(): void {
        this.popularTags$ = this.store.pipe(select((store: AppStateInterface): PopularTagsType[] => {
            return store.popularTags.data;
        }))

        this.isLoading$ = this.store.pipe(select((store: AppStateInterface): boolean => {
            return store.popularTags.isLoading;
        }))

        this.error$ = this.store.pipe(select((store: AppStateInterface): string | null => {
            return store.popularTags.error
        }))
    }

    fetchPopularTags(): void {
        const apiUrl = `/tags`
        this.store.dispatch(getPopularTagsAction({url: apiUrl}))
    }
}