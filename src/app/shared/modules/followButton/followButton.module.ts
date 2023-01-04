import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { FollowButtonComponent } from './components/followButton.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FollowButtonComponent],
  exports: [FollowButtonComponent],
})
export class FollowButtonModule {
  @Input() userName;
}
