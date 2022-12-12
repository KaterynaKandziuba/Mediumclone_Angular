import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { SaveArticleResponseInterface } from 'src/app/shared/types/saveArticleResponce.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class UpdateArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string, // what article to update
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`;

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, { article: articleInput })
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
