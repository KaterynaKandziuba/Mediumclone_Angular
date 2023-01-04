import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mc-follow-button',
  templateUrl: './followButton.component.html',
})
export class FollowButtonComponent implements OnInit {
  @Input('username') usernameProps: string;
  @Input('isFollowed') isFollowedProps: boolean;
  @Input('profileSlug') profileSlugProps: string;
  profileSlug: string;
  isFollowed: boolean;
  username: string;

  ngOnInit(): void {
    this.username = this.usernameProps;
    this.isFollowed = this.isFollowedProps;
    this.profileSlug = this.profileSlug;
  }

  handleFollowing(): void {
    this.isFollowed = !this.isFollowed;
    // dispatch event
    this.isFollowed ? console.log('Following') : console.log('Unfollowing');
  }
}
