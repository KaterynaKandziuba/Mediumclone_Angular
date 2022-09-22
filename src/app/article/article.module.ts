import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { GetArticleEffect } from './store/effects/getArticleEffect';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/errorMessage copy/errorMessage.module';
import { ArticleComponent } from './components/article.component';
import { TagListModule } from '../shared/modules/tagList/lagList.module';
import { ArticleService } from './article.service';
import { DeleteArticleEffect } from './store/effects/deleteArticleEffect';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ArticleComponent],
  exports: [ArticleComponent],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
