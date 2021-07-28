import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { Observable, observable } from 'rxjs';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getWeatherForCity is called',() => {
    it('data is retrieved', () => {
      expect(service.getWeatherForCity('halifax')).toBeInstanceOf(Observable)
    });
  });
});
