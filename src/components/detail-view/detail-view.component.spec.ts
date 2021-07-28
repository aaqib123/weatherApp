import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { DetailViewComponent } from './detail-view.component';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const subject = new ReplaySubject<any>(1);
const weatherObj = of({
  city: {
    id: 1,
    name: 'halifax',
  },
  cod: 'string',
  message: 1,
  cnt: 1,
  list: [],
});

const ActivatedRouteSpy = {
  params: {
    pipe: jasmine.createSpy('pipe').and.returnValue(subject),
  },
};

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(weatherObj),
  subscribe: jasmine.createSpy('subscribe').and.returnValue({}),
};

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DetailViewComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: ActivatedRouteSpy },
        { provide: Store, useValue: mockStore },
      ],
    });
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`cityID has default value`, () => {
    expect(component.cityID).toEqual(0);
  });

  describe('When ngOnInit is invoked', () => {
    describe('and CityID exists in store', () => {
      it('selectCityData is called and route is set', () => {
        component.ngOnInit();
        component.cityData$?.subscribe((val)=>console.log(val));

        expect(mockStore.select).toHaveBeenCalled();
        expect(ActivatedRouteSpy.params.pipe).toHaveBeenCalled();
      });
    });

    describe('and CityID DOESNT exist in store', () => {
      it('selectCityData is called and route is not set', () => {
        component.ngOnInit();
        // component.cityData$?.subscribe((val)=>{console.log(val)});
        expect(mockStore.select).toHaveBeenCalled();
        expect(ActivatedRouteSpy.params.pipe).toHaveBeenCalled();
      });
    });
  });
});
