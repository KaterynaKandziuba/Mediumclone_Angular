import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { GetArticleEffect } from './store/effects/getFeedEffect';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/errorMessage copy/errorMessage.module';
import { ArticleComponent } from './components/article.component';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
    imports: [
        CommonModule,
        EffectsModule.forFeature([GetArticleEffect]),
        StoreModule.forFeature('article', reducers),
        RouterModule,
        ErrorMessageModule,
        LoadingModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ArticleComponent],
    exports: [ArticleComponent],
    providers: [SharedArticleService]
})
export class ArticleModule {}
