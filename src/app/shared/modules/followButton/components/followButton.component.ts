import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { startFollowingAction } from '../store/follow.action';

@Component({
  selector: 'mc-follow-button',
  templateUrl: './followButton.component.html',
})
export class FollowButtonComponent implements OnInit {
  @Input('username') usernameProps: string;
  @Input('isFollowed') isFollowedProps: boolean;
  @Input('profileSlug') profileSlugProps: string;
  profileSlug: string;
  isFollowed: boolean; // we update user profile after navigation, so need to update user data
  username: string; // including following and username fields
  isLoggedIn: boolean; // if not logged - redirect to login page

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.username = this.usernameProps;
    this.isFollowed = this.isFollowedProps;
    this.profileSlug = this.profileSlug;
  }

  handleFollowing(): void {
    this.store.dispatch(
      startFollowingAction({
        isFollowed: this.isFollowed,
        slug: this.profileSlug,
      })
    );
    this.isFollowed = !this.isFollowed;
  }
}
