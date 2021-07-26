import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  mergeMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';

import { of } from 'rxjs';
import * as allActions from './weather.actions';
import { WeatherService } from '../services/weather.service';
import { Store } from '@ngrx/store';
import { AppState, selectCityData } from './weather.selector';
import { WeatherObject } from './weather.models';
import { Router } from '@angular/router';
@Injectable()
export class WeatherEffects {
  addCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.AddCityAction),
      withLatestFrom(this.store.select(selectCityData)),
      mergeMap(([payload, allCities]) => {
        return this.weatherService.getWeatherForCity(payload.data).pipe(
          map((result: WeatherObject) => {
            const newcityExists = allCities.findIndex(
              (cities) => cities.city.id === result.city.id
            );
            if (newcityExists > -1) {
              throw { error: { message: 'City exists already' } };
            } else {
              if (allCities.length >= 8) {
                this.store.dispatch(
                  allActions.DelCityAction({
                    data: allCities[allCities.length - 1].city.id
                  })
                );
              }
            }
            this.router.navigate([result.city.id]);
            return allActions.AddCitySuccessAction({ data: result });
          }),
          catchError((error) => of(allActions.AddCityFailureAction(error)))
        );
      })
    )
  );

  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.DelCityAction),
      mergeMap(() => of(allActions.DelCitySuccessAction()))
    )
  );

  refreshCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(allActions.RefreshCityAction),
      mergeMap((payload) =>
        this.weatherService.getWeatherForCity(payload.data).pipe(
          map((result) =>
            allActions.RefreshCitySuccessAction({ data: result })
          ),
          catchError((error) => of(allActions.RefreshCityFailureAction(error)))
        )
      )
    )
  );

  constructor (
    private store: Store<AppState>,
    private actions$: Actions<allActions.WeatherActionsType>,
    private weatherService: WeatherService,
    private router:Router
  ) {}
}
