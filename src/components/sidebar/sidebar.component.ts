import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  AddCityAction,
  DelCityAction,
  RefreshCityAction,
} from 'src/store/weather.actions';
import { AppState, selectCityData } from 'src/store/weather.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public form: FormGroup;
  public allCityData$: Observable<any> | undefined;
  protected subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.fb.group({
      cityName: [null],
    });

    this.allCityData$ = this.store.select(selectCityData);
    this.subscriptions.push(
    this.allCityData$.subscribe((cities) => {
      cities.length > 0 && this.router.navigate([cities[0]?.city.id]);
    }));
  }

  ngOnInit(): void {}

  public addCity() {
    if (this.form.controls['cityName'].value) {
      this.store.dispatch(
        AddCityAction({
          data: this.form.controls['cityName'].value,
        })
      );
    }
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
    event.preventDefault();
    event.stopPropagation();
  }

  public deleteCity(cityID: number) {
    this.store.dispatch(
      DelCityAction({
        data: cityID,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
