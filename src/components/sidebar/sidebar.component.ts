import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { weatherUnits } from 'src/config/app-config';
import { iconCodes } from 'src/config/icon-maps';
import {
  AddCityAction,
  DelCityAction,
  RefreshCityAction,
  DelAllCitiesAction,
} from 'src/store/weather.actions';
import { AppState, WeatherObject } from 'src/store/weather.models';
import { selectCityData } from 'src/store/weather.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  public form: FormGroup;
  public cityCount: number = 0;
  public allCityData$: Observable<WeatherObject[]>;
  public iconCode: any;
  public temperatureUnit: String = weatherUnits.TEMP_UNIT;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.iconCode = iconCodes;

    this.form = this.fb.group({
      cityName: [null],
    });

    //  fetch all city data from the store
    this.allCityData$ = this.store.select(selectCityData);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.allCityData$.subscribe((cities) => {
        // setting city length to hide/show 'delete city' button
        this.cityCount = cities.length;
        this.cityCount === 0 ? this.resetPath():null;
      })
    );
  }

  public addCity() {
    if (!!this.form.controls.cityName.value) {
      this.store.dispatch(
        AddCityAction({
          data: this.form.controls.cityName.value,
        })
      );
    }
    //  clear input field on adding
    this.form.reset();
  }

  public showCityWeather(cityID: number) {
    this.router.navigate([cityID]);
  }

  public refreshCity(event: Event, cityName: string, cityID: number) {
    this.store.dispatch(
      RefreshCityAction({
        data: cityName,
        id: cityID,
      })
    );
    //  stop event propagation to prevent city from being loaded into detailed view when cliking on refresh
    event.stopPropagation();
  }

  public deleteCity(cityID: number) {
    this.store.dispatch(
      DelCityAction({
        data: cityID,
      })
    );
    this.resetPath();
  }

  public deleteAllCities() {
    //  reset store
    this.store.dispatch(DelAllCitiesAction());
  }

  public resetPath() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
