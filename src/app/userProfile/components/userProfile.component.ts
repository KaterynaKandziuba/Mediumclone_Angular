import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  last,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { CurrentUserInterface } from 'src/app/auth/shared/types/currentUser.interface';
import { ProfileInterface } from 'src/app/auth/shared/types/profile.interface';
import { CurrentUserSelector } from 'src/app/auth/store/selectors';
import { getUserProfileAction } from '../store/actions/getUserProfile.action';
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from '../store/selectors';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
})
export class UserProfileComponent implements OnInit, DoCheck, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  slug: string;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  // TODO: change the way to update "following" status for inner follow button
  ngDoCheck(): void {
    this.userProfileSubscription = this.store
      .pipe(
        select((state: AppStateInterface) => state.userProfile.data),
        filter(Boolean)
      )
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  initializeValues(): void {
    const isFavorites = this.router.url.includes('favorites');
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.getApiUrl();
    // combining some streams to make a proper comparison
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(CurrentUserSelector), filter(Boolean)), // insure against nulls
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          ProfileInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  fetchData(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites'); // getting access to url
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  initializeListeners(): void {
    this.route.params.subscribe((params) => {
      // we need to refetch data to update feed for different profiles
      // before this slug should be updated
      this.slug = params['slug'];
      this.fetchData();
    });
  }
}
