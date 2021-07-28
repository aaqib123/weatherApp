import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, selectError } from 'src/store/weather.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectError).subscribe((error) => {
        if (!!error?.message) {
          this._snackBar.open(error?.message || '', 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
