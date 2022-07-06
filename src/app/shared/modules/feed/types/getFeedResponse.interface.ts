import { ArticleInterface } from "src/app/auth/shared/types/article.interface";

export interface GetFeedResponseInterface {
    articles: ArticleInterface[];
    articlesCount: number;
}