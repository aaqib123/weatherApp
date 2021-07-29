import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { weatherUnits } from 'src/config/app-config';
import { RefreshCityAction } from 'src/store/weather.actions';
import { AppState } from 'src/store/weather.models';
import { isLoading, selectCityData } from 'src/store/weather.selector';
import { iconCodes } from '../../config/icon-maps';
@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
})
export class DetailViewComponent {
  public cityID: number = 0;
  public cityData$: Observable<any>;
  public isLoading$: Observable<boolean>;
  public iconCode: any;
  public units: any;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.iconCode = iconCodes;
    this.units = {
      tempUnit: weatherUnits.TEMP_UNIT,
      speedUnit: weatherUnits.WIND_SPEED_UNIT,
      directionUnit: weatherUnits.WIND_DIRECTION_UNIT,
    };

    //  fetch city from store using city id in the route params
    this.cityData$ = this.route.params.pipe(
      withLatestFrom(this.store.select(selectCityData)),
      map(([params, cityData]) =>
        cityData.find((cityObj) => cityObj.city.id === parseInt(params.cityID))
      )
    );

    //  fetch loading state from store
    this.isLoading$ = this.store.select(isLoading);
  }

  public refreshCity(cityName: string, cityID: number) {
    this.store.dispatch(
      RefreshCityAction({
        data: cityName,
        id: cityID,
      })
    );
  }
}
