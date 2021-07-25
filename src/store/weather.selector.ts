import { createSelector, MemoizedSelector } from '@ngrx/store';
import { WeatherObject, WeatherState } from './weather.models';

export interface AppState {
  weatherState: WeatherState;
}

export const fullState = (state: AppState) => state.weatherState;

export const selectCityData: MemoizedSelector<AppState, WeatherObject[]> =
  createSelector(fullState, (cityData: WeatherState) => {
    return cityData.data;
  });

export const selectCityLength: MemoizedSelector<AppState, number> =
  createSelector(fullState, (cityData: WeatherState) => {
    return cityData.data.length;
  });

export const selectError = createSelector(
  fullState,
  (state: WeatherState) => state.error
);

export const selectIsLoading = createSelector(
  fullState,
  (state: WeatherState) => state.loading
);
