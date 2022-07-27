import { AuthStateInterface } from '../../types/authState.interface';
import { FeedStateInterface } from '../../../shared/modules/feed/types/feedSatate.interface';
import { PopularTagsStateInterface } from 'src/app/shared/modules/popularTags/types/PopularTagsState.interface';

// загальний інтерфейс усього стану
export interface AppStateInterface {
    auth: AuthStateInterface;
    feed: FeedStateInterface;
    popularTags: PopularTagsStateInterface;
}