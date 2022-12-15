import { AuthStateInterface } from '../../types/authState.interface';
import { FeedStateInterface } from '../../../shared/modules/feed/types/feedSatate.interface';
import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/PopularTagsState.interface';
import { ArticleStateInterface } from 'src/app/article/types/articleState.interface';
import { CreateArticleStateInterface } from 'src/app/createArticle/types/createArticleState.interface';
import { EditArticleStateInterface } from 'src/app/editArticle/types/editArticleState.interface';
import { SettingsStateInterface } from 'src/app/settings/store/types/settingsState.interface';

// загальний інтерфейс усього стану
export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
}
