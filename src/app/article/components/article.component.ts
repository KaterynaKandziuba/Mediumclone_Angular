import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { CurrentUserInterface } from 'src/app/auth/shared/types/currentUser.interface';
import { deleteArticleAction } from '../store/actions/deleteArticle.action';
import { getArticleAction } from '../store/actions/getArticle.action';
import { ErrorSelector, IsLoadingSelector } from '../store/selectors';
@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  // часто використовуємо у вьюсі, тому не хочемо всюди писати пайп
  article: ArticleInterface | null;
  articleSubcription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    // на моменті дестрою компоненту ми відписуємось
    this.articleSubcription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(IsLoadingSelector));
    this.error$ = this.store.pipe(select(ErrorSelector));
    this.isAuthor$ = combineLatest(
      this.store.pipe(select((store: AppStateInterface) => store.article.data)),
      this.store.pipe(
        select((store: AppStateInterface) => store.auth.currentUser)
      )
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return article.author.username === currentUser.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.articleSubcription = this.store
      .pipe(select((store: AppStateInterface) => store.article.data))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
