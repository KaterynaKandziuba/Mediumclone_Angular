import { AuthStateInterface } from '../../types/authState.interface';
import { FeedStateInterface } from '../../../shared/modules/feed/types/feedSatate.interface';

// загальний інтерфейс усього стану
export interface AppStateInterface {
    auth: AuthStateInterface;
    feed: FeedStateInterface;
}