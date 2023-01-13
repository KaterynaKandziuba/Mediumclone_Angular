import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { startFollowingAction } from '../store/follow.action';

@Component({
  selector: 'mc-follow-button',
  templateUrl: './followButton.component.html',
})
export class FollowButtonComponent implements OnInit, OnDestroy {
  @Input('username') usernameProps: string;
  @Input('isFollowed') isFollowedProps: boolean;
  @Input('profileSlug') profileSlugProps: string;
  profileSlug: string;
  isFollowed: boolean;
  username: string;
  isLoggedIn$: Observable<boolean>;
  isLoggedInSubscription: Subscription;
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.username = this.usernameProps;
    this.isFollowed = this.isFollowedProps;
    this.profileSlug = this.profileSlugProps;
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  ngOnDestroy(): void {
    !this.isLoggedInSubscription ?? this.isLoggedInSubscription.unsubscribe();
  }

  handleFollowing(): void {
    console.log('Is following:', this.isFollowed);
    this.isLoggedInSubscription = this.isLoggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.store.dispatch(
            startFollowingAction({
              isFollowed: this.isFollowed,
              slug: this.profileSlug,
            })
          );
          this.isFollowed = !this.isFollowed;
        } else {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
