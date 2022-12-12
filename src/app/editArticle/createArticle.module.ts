import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleFormModule } from '../shared/modules/articleForm/articleForm.module';
import { EditArticleComponent } from './components/editArticle.component';
import { UpdateArticleService } from './services/editArticle.service';
import { UpdateArticleEffect } from './store/effects/updateArticle.effect';
import { reducers } from 'src/app/editArticle/store/reducers';
import { ArticleService as SharedArticleService } from '../article/article.service';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { LoadingModule } from '../shared/modules/loading/loading.module';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ArticleFormModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    LoadingModule,
  ],
  declarations: [EditArticleComponent],
  providers: [UpdateArticleService, SharedArticleService],
})
export class EditArticleModule {}
