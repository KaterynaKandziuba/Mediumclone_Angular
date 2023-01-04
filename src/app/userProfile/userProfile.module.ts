import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FollowButtonModule } from '../shared/modules/followButton/followButton.module';
import { UserProfileComponent } from './components/userProfile.component';
import { GetUserProfileEffect } from './store/getUserProfile.effect';
import { reducers } from './store/reducers';
import { UserProfileService } from './userProfile.service';

const routes = [
  {
    path: 'profiles/:slug', // :whatever - dynamic parameter
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:slug/favorites', // всередині компоненту, залежно від шляху в урлі, ми будемо визначати апі урлу
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', reducers),
    FeedModule,
    FollowButtonModule,
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService],
})
export class UserProfileModule {}
