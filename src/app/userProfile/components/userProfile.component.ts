import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, Subscription } from 'rxjs';
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
export class UserProfileComponent implements OnInit, OnDestroy {
  userProfile: ProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  slug: string;
  apiUrl: string;
  isCurrentUserProfile$: Observable<boolean>; // чи є поточний користувач юзер-профілем, який ми бачимо

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  initializeValues(): void {
    const isFavorites = this.router.url.includes('favorites'); // через роутер отримуємо доступ до урли
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.getApiUrl();
    // комбінуємо декілька стрімів, щоб отримати якусь відповідь
    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(CurrentUserSelector), filter(Boolean)), // щоб 100% не було нуллів
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
    const isFavorites = this.router.url.includes('favorites'); // через роутер отримуємо доступ до урли
    return (this.apiUrl = isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`);
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => {
        this.userProfile = userProfile;
      });

    this.route.params.subscribe((params) => {
      // ми маємо перефетчувати дані, щоб оновлювалася стрічка для різних профілів
      // механізм ангуляру не перефетчує дані для внутрішніх компонентів
      // але перед цим ми маємо оновити слаг, а потім апі урлу
      this.slug = params['slug'];
      this.fetchData();
      console.log('Params from route', params);
    });
  }
}
