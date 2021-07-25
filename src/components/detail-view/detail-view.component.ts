import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, filter, concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { AppState, selectCityData } from 'src/store/weather.selector';
import { iconCodes,iconCodesa } from '../../app/app.config';
@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {

  public cityID: number = 0;
  public cityData$: Observable<any> | undefined;
  public iconCode: any;
  public todaysDate:number = new Date().getDate();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.iconCode = iconCodes;
  }


  ngOnInit() {
    this.cityData$ = this.route.params.pipe(
      withLatestFrom(this.store.select(selectCityData)),
      map(([params, cityData]) => cityData.filter((cityObj: any) => cityObj.city.id == params.cityID))
    );
  }

}
