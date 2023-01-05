import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { FollowButtonComponent } from './components/followButton.component';
import { FollowService } from './follow.service';
import { FollowEffect } from './store/follow.effect';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([FollowEffect])],
  declarations: [FollowButtonComponent],
  exports: [FollowButtonComponent],
  providers: [FollowService],
})
export class FollowButtonModule {
  @Input() userName;
}
