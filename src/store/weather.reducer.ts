import { Action, createReducer, on } from '@ngrx/store';
import * as allActions from './weather.actions';
import { WeatherObject, WeatherState } from './weather.models';

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: undefined,
};

export const wReducer = createReducer(
  initialState,
  on(allActions.AddCityAction, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(allActions.AddCitySuccessAction, (state, { data }) => ({
    ...state,
    data: [data, ...state.data],
    loading: false,
  })),
  on(allActions.AddCityFailureAction, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  })),
  on(allActions.RefreshCityAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(allActions.RefreshCitySuccessAction, (state, payload) => {
    const index = state.data.findIndex(
      (cities: WeatherObject) => cities.city.id === payload.data.city.id
    );

    return {
      ...state,
      data: [
        ...state.data.slice(0, index),
        payload.data,
        ...state.data.slice(index + 1),
      ],
      loading: false,
    };
  }),
  on(allActions.RefreshCityFailureAction, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  })),
  on(allActions.DelCityAction, (state, payload) => ({
    ...state,
    data: state.data.filter((cities: any) => cities.city.id !== payload.data),
    loading: true,
  })),
  on(allActions.DelCitySuccessAction, (state) => ({
    ...state,
    loading: false,
  })),
  on(allActions.DelAllCitiesAction, (state) => initialState)
);

export function WeatherReducer(
  state: WeatherState | undefined,
  action: Action
) {
  return wReducer(state, action);
}
