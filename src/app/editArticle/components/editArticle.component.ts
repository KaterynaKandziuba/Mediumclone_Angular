import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { validationErrorsSelector } from 'src/app/createArticle/store/selectors';
import { ActivatedRoute } from '@angular/router';
import { updateArticleAction } from '../store/actions/updateArticle.action';
import { getArticleAction } from '../store/actions/getArticle.action';
import { articleSelector, isLoadingSelector } from '../store/selectors';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  slug: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(
      select((store: AppStateInterface) => store.createArticle.isSubmitting)
    );
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      // don't allow article with null or undefined
      filter(Boolean),
      map((article: ArticleInterface): ArticleInputInterface => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onOutterSubmit(data: ArticleInputInterface) {
    this.store.dispatch(
      updateArticleAction({ articleInput: data, slug: this.slug })
    );
  }
}
