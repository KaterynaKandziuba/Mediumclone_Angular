import { ArticleInterface } from 'src/app/auth/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/auth/types/backendErrors.interface';

export interface EditArticleStateInterface {
  isLoading: boolean;
  article: ArticleInterface | null;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
