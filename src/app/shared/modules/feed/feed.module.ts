import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FeedComponent } from './components/feed.component';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/getFeedEffect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers'; 
import { FeedService } from './services/feed.service';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../errorMessage copy/errorMessage.module';
import { PaginationModule } from '../pagination/pagination.module';
import { TagListModule } from '../tagList/lagList.module';

// немає рута, бо це шеребл компонент
@NgModule({
    imports: [
        CommonModule, 
        EffectsModule.forFeature([GetFeedEffect]), 
        StoreModule.forFeature('feed', reducers),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
        PaginationModule,
        TagListModule
    ],
    declarations: [FeedComponent],
    // бо ми хочемо рендерити компонент в глобальному фіді
    exports: [FeedComponent],
    providers: [FeedService]
})
export class FeedModule {}