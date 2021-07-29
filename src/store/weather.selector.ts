import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState, WeatherObject, WeatherState } from './weather.models';

export const fullState = (state: AppState) => state.weatherState;

export const selectCityData: MemoizedSelector<AppState, WeatherObject[]> =
  createSelector(fullState, (cityData: WeatherState) => cityData.data);

export const selectCityLength: MemoizedSelector<AppState, number> =
  createSelector(fullState, (cityData: WeatherState) => cityData.data.length);

export const selectError: MemoizedSelector<AppState, Error | undefined> =
  createSelector(fullState, (state: WeatherState) => state.error);

export const isLoading: MemoizedSelector<AppState, boolean> =
  createSelector(fullState, (state: WeatherState) => state.loading);
