import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { validationErrorsSelector } from 'src/app/createArticle/store/selectors';
import { createArticleAction } from '../store/actions/createArticle.action';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
})
export class CreateArticleComponent implements OnInit {
  creationInitialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(
      select((store: AppStateInterface) => store.createArticle.isSubmitting)
    );
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onOutterSubmit(data: ArticleInputInterface) {
    this.store.dispatch(createArticleAction({ articleInput: data }));
  }
}
