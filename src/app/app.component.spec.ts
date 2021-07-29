import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { of } from 'rxjs';

const mockStore2 = {
  select: jasmine
    .createSpy('select')
    .and.returnValue(of({ message: 'error msg' })),
};
const mockStore3 = {
  select: jasmine.createSpy('select').and.returnValue(of(undefined)),
};

const mockMatSnackBar = {
  open: jasmine.createSpy('open').and.returnValue({}),
};

const createTestbed = (app: typeof AppComponent, options: any) => {
  TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [app],
    providers: [
      { provide: Store, useValue: options },
      { provide: MatSnackBar, useValue: mockMatSnackBar },
    ],
  });
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    createTestbed(AppComponent, mockStore3);
  });

  it('can load instance', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('When ngOnInit is invoked', () => {
    describe('And selectError selector DOESNT return an error message', () => {
      it('Then DONT show the snackbar', () => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        expect(mockStore3.select).toHaveBeenCalled();
        expect(mockMatSnackBar.open).not.toHaveBeenCalled();
      });
    });

    describe('And selectError selector returns an error message', () => {
      it('Then show the snackbar', () => {
        createTestbed(AppComponent, mockStore2);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        expect(mockStore2.select).toHaveBeenCalled();
        expect(mockMatSnackBar.open).toHaveBeenCalled();
      });
    });
  });
});
