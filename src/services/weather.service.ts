import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WeatherObject } from 'src/store/weather.models';
import { delay, map } from 'rxjs/operators';
import { weatherServiceConfig } from './weather.service.config';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherForCity(city: string): Observable<WeatherObject> {
    const apiPath = `${weatherServiceConfig.URL}?q=${city}&cnt=${weatherServiceConfig.DAY_COUNT}&units=metric&appid=${weatherServiceConfig.API_KEY}`;

    return this.http.get<WeatherObject>(apiPath);
  }
}
