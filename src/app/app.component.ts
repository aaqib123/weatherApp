import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { WeatherState } from 'src/store/weather.models';
import {
  AppState,
  selectError,
} from 'src/store/weather.selector';
import { WeatherService } from './weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  protected subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectError).subscribe((error) => {
        error?.message
          ? this._snackBar.open(error?.message || '', 'close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
          : this._snackBar.dismiss();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
