import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { GetArticleResponseInterface } from "../types/getArticleResponse.interface";
import { ArticleInterface } from "src/app/auth/shared/types/article.interface";

@Injectable()
export class ArticleService {
    constructor(private http: HttpClient){}

    getArticle(slug: string): Observable<ArticleInterface>{
        const fullUrl = `${environment.apiUrl}/articles/${slug}`;
        return this.http.get<GetArticleResponseInterface>(fullUrl).pipe(map((responce: GetArticleResponseInterface) => responce.article));
    }
}
