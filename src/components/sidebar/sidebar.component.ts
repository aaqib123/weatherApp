import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  AddCityAction,
  DelCityAction,
  RefreshCityAction,
  DelAllAction
} from 'src/store/weather.actions';
import { WeatherObject } from 'src/store/weather.models';
import { AppState, selectCityData } from 'src/store/weather.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public form: FormGroup;
  public cityCount: number = 0;
  public allCityData$: Observable<WeatherObject[]>;
  private subscriptions: Subscription[] = [];

  constructor (
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.fb.group({
      cityName: [null]
    });

    this.allCityData$ = this.store.select(selectCityData);
    this.subscriptions.push(
      this.allCityData$.subscribe((cities) => {
        this.cityCount = cities.length;
      })
    );
  }

  public addCity () {
    if (this.form.controls.cityName.value.length > 1) {
      this.store.dispatch(
        AddCityAction({
          data: this.form.controls.cityName.value
        })
      );
    }
    this.form.reset();
  }

  public showCityWeather (cityID: number) {
    this.router.navigate([cityID]);
  }

  public refreshCity (event: Event, cityName: string, cityID: number) {
    this.store.dispatch(
      RefreshCityAction({
        data: cityName,
        id: cityID
      })
    );
    event.preventDefault();
    event.stopPropagation();
  }

  public deleteCity (cityID: number) {
    this.store.dispatch(
      DelCityAction({
        data: cityID
      })
    );
  }

  public deleteAllCities () {
    this.store.dispatch(DelAllAction());
  }

  ngOnDestroy (): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
