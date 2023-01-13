import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/auth/shared/types/appState.interface';
import { FeedStateInterface } from '../types/feedSatate.interface';

// T - global state
// V - local state
export const feedFeatureSelector = createFeatureSelector<
  AppStateInterface,
  FeedStateInterface
>('feed');

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
);

export const errorSelector = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.error
);

export const feedSelector = createSelector(
    feedFeatureSelector,
    (feedState: FeedStateInterface) => feedState.data
);
