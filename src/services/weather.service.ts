import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WeatherObject } from 'src/store/weather.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  private API_KEY: string = 'c51223c219d6aec8cb8c5210449bd859'; //will be moved to a vault in a real world scenrio
  private DAYCOUNT: number = 7;
  private url: string =
    'https://api.openweathermap.org/data/2.5/forecast/daily';

  getWeatherForCity(city: string): Observable<WeatherObject> {
    const apiPath = `${this.url}?q=${city}&cnt=${this.DAYCOUNT}&units=metric&appid=${this.API_KEY}`;

    return this.http.get<WeatherObject>(apiPath);
  }
}
