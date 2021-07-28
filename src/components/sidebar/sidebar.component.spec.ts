import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SidebarComponent } from './sidebar.component';
import { ReplaySubject } from 'rxjs';

const navigateStub = jasmine.createSpy('navigate');

class mockRouter {
  public url = '';
  public navigate = navigateStub;
}

const formBuilder: FormBuilder = new FormBuilder();
formBuilder.group({
  cityName: new FormControl({ value: 'halifax' }),
});

const subject = new ReplaySubject<any>(1);
const mockStore = {
  pipe: jasmine.createSpy('pipe').and.returnValue(subject),
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select').and.returnValue(subject),
  subscribe: jasmine.createSpy('subscribe').and.returnValue({}),
};
// const mockRouter = {
//   navigate : jasmine.createSpy('navigate')
// }

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidebarComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Router, useClass: mockRouter },
        { provide: Store, useValue: mockStore },
      ],
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`cityCount has default value`, () => {
    expect(component.cityCount).toEqual(0);
  });

  describe('When addCity funciton is called', () => {
    describe('and user enters invalid city', () => {
      it('DOESNT dispatch AddCityAction', () => {
        component.form.controls.cityName.setValue('');
        component.addCity();
        expect(mockStore.dispatch).not.toHaveBeenCalled();
      });
    });
    describe('and user enters valid city', () => {
      it('dispatch AddCityAction', () => {
        component.form.controls.cityName.setValue('halifax');
        component.addCity();
        expect(mockStore.dispatch).toHaveBeenCalled();
      });
    });
  });

  describe('showCityWeather', () => {
    it('makes expected calls', () => {
      component.showCityWeather(1);
      expect(navigateStub).toHaveBeenCalledWith([1]);
    });
  });

  describe('refreshCity', () => {
    it('makes expected calls', () => {
      component.refreshCity(new Event('click'), 'halifax', 1);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  describe('deleteCity', () => {
    it('makes expected calls', () => {
      component.deleteCity(1);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });

  describe('deleteAllCities', () => {
    it('makes expected calls', () => {
      component.deleteAllCities();
      expect(mockStore.dispatch).toHaveBeenCalled();
    });
  });
});
