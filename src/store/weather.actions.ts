import { createAction, props, union } from "@ngrx/store";
import { WeatherObject } from "./weather.models";

enum WeatherActionEnum {
  ADD_CITY = '[ADD] Add City',
  ADD_CITY_SUCCESS = '[ADD] Add City success',
  ADD_CITY_FAILURE = '[ADD] Add City failure',
  REFRESH_CITY = '[UPDATE] Refresh City',
  REFRESH_CITY_SUCCESS = '[UPDATE] Refresh City success',
  REFRESH_CITY_FAILURE = '[UPDATE] Refresh City failure',
  DELETE_CITY = '[DELETE] Delete City',
  DELETE_CITY_SUCCESS = '[DELETE] Delete City success'
}


export const AddCityAction = createAction(
  WeatherActionEnum.ADD_CITY,
  props<{ data: string }>()
);
export const AddCitySuccessAction = createAction(
  WeatherActionEnum.ADD_CITY_SUCCESS,
  props<{ data: WeatherObject }>()
);
export const AddCityFailureAction = createAction(
  WeatherActionEnum.ADD_CITY_FAILURE,
  props<{ error: Error }>()
);
export const RefreshCityAction = createAction(
  WeatherActionEnum.REFRESH_CITY,
  props<{ data: string,id:number }>()
);
export const RefreshCitySuccessAction = createAction(
  WeatherActionEnum.REFRESH_CITY_SUCCESS,
  props<{ data: WeatherObject }>()
);
export const RefreshCityFailureAction = createAction(
  WeatherActionEnum.REFRESH_CITY_FAILURE,
  props<{ error: Error }>()
);
export const DelCityAction = createAction(
  WeatherActionEnum.DELETE_CITY,
  props<{ data: number }>()
);
export const DelCitySuccessAction = createAction(
  WeatherActionEnum.DELETE_CITY_SUCCESS
);


const actions = union({
  AddCityAction,
  AddCitySuccessAction,
  AddCityFailureAction,
  DelCityAction,
  DelCitySuccessAction,
});

export type WeatherActionsType = typeof actions;
