import { ArticleInterface } from "src/app/auth/shared/types/article.interface";

export interface ArticleStateInterface {
    isLoading: boolean;
    error: string | null;
    data: ArticleInterface | null;
}
