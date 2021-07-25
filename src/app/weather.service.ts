import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { WeatherObject } from 'src/store/weather.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  deleteShoppingItem(payload: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  private APPID: string = 'c51223c219d6aec8cb8c5210449bd859';
  private DAYCOUNT: number = 7;
  private CITYNAME: string = '';
  private url: string = 'https://api.openweathermap.org/data/2.5/forecast/daily';



  getWeatherForCity(city: string): Observable<WeatherObject> {
    const apiPath = `${this.url}?q=${city}&cnt=${this.DAYCOUNT}&units=metric&appid=${this.APPID}`;

    return this.http.get<WeatherObject>(apiPath);
    // .pipe(
    //   map((data) => {
    //     console.log('data: ', data);
    //     return {
    //       ...data,
    //     };
    //   })
    // );
    return of(this.cities).pipe(
      map((data)=>{
        console.log('data: ', data);
        return {
          ...data,
          city : {
            ...data.city,
            id: (Math.floor(100000 + Math.random() * 900000)),
            name: Math.random().toString(36).substring(7)}
        };
      }),
      delay(500)
    )

  }

  deleteCity(city: string): Observable<any> {
    return of();
  }


  public cities = {
        "city": {
            "id": 6324729,
            "name": "Halifax",
            "coord": {
                "lon": -63.5724,
                "lat": 44.6453
            },
            "country": "CA",
            "population": 359111,
            "timezone": -10800
        },
        "cod": "200",
        "message": 0.1434821,
        "cnt": 7,
        "list": [
            {
                "dt": 1627228800,
                "sunrise": 1627203187,
                "sunset": 1627256892,
                "temp": {
                    "day": 22.73,
                    "min": 14.17,
                    "max": 22.82,
                    "night": 16.56,
                    "eve": 19.16,
                    "morn": 15
                },
                "feels_like": {
                    "day": 22.65,
                    "night": 16.52,
                    "eve": 18.93,
                    "morn": 14.91
                },
                "pressure": 1017,
                "humidity": 61,
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "sky is clear",
                        "icon": "01d"
                    }
                ],
                "speed": 5.06,
                "deg": 204,
                "gust": 10.21,
                "clouds": 0,
                "pop": 0.02
            },
            {
                "dt": 1627315200,
                "sunrise": 1627289651,
                "sunset": 1627343229,
                "temp": {
                    "day": 19.04,
                    "min": 16.74,
                    "max": 22.23,
                    "night": 17.77,
                    "eve": 21.12,
                    "morn": 17.59
                },
                "feels_like": {
                    "day": 19.56,
                    "night": 18.11,
                    "eve": 21.59,
                    "morn": 17.94
                },
                "pressure": 1010,
                "humidity": 98,
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "speed": 6.38,
                "deg": 195,
                "gust": 13.14,
                "clouds": 100,
                "pop": 1,
                "rain": 5.24
            },
            {
                "dt": 1627401600,
                "sunrise": 1627376116,
                "sunset": 1627429564,
                "temp": {
                    "day": 25.17,
                    "min": 16.29,
                    "max": 25.64,
                    "night": 18.57,
                    "eve": 23.44,
                    "morn": 16.29
                },
                "feels_like": {
                    "day": 25.31,
                    "night": 18.73,
                    "eve": 23.56,
                    "morn": 16.43
                },
                "pressure": 1012,
                "humidity": 60,
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "sky is clear",
                        "icon": "01d"
                    }
                ],
                "speed": 4.81,
                "deg": 193,
                "gust": 7.77,
                "clouds": 1,
                "pop": 0.11
            },
            {
                "dt": 1627488000,
                "sunrise": 1627462582,
                "sunset": 1627515898,
                "temp": {
                    "day": 21.34,
                    "min": 15.95,
                    "max": 23.86,
                    "night": 17.05,
                    "eve": 21.88,
                    "morn": 15.95
                },
                "feels_like": {
                    "day": 21.04,
                    "night": 16.82,
                    "eve": 21.64,
                    "morn": 16.11
                },
                "pressure": 1012,
                "humidity": 58,
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "speed": 3.63,
                "deg": 284,
                "gust": 8.32,
                "clouds": 100,
                "pop": 0.01
            },
            {
                "dt": 1627574400,
                "sunrise": 1627549048,
                "sunset": 1627602229,
                "temp": {
                    "day": 22.06,
                    "min": 13.14,
                    "max": 23.26,
                    "night": 17.78,
                    "eve": 20.77,
                    "morn": 13.14
                },
                "feels_like": {
                    "day": 21.5,
                    "night": 17.55,
                    "eve": 20.42,
                    "morn": 12.86
                },
                "pressure": 1015,
                "humidity": 45,
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03d"
                    }
                ],
                "speed": 6.03,
                "deg": 209,
                "gust": 11.55,
                "clouds": 38,
                "pop": 0
            },
            {
                "dt": 1627660800,
                "sunrise": 1627635515,
                "sunset": 1627688559,
                "temp": {
                    "day": 23.16,
                    "min": 14.93,
                    "max": 24.44,
                    "night": 18.08,
                    "eve": 23.58,
                    "morn": 16.64
                },
                "feels_like": {
                    "day": 23.39,
                    "night": 18.22,
                    "eve": 23.64,
                    "morn": 16.89
                },
                "pressure": 1000,
                "humidity": 71,
                "weather": [
                    {
                        "id": 501,
                        "main": "Rain",
                        "description": "moderate rain",
                        "icon": "10d"
                    }
                ],
                "speed": 7.73,
                "deg": 143,
                "gust": 15.46,
                "clouds": 85,
                "pop": 1,
                "rain": 16.01
            },
            {
                "dt": 1627747200,
                "sunrise": 1627721982,
                "sunset": 1627774888,
                "temp": {
                    "day": 19.58,
                    "min": 14.02,
                    "max": 21.43,
                    "night": 17.26,
                    "eve": 21.14,
                    "morn": 14.22
                },
                "feels_like": {
                    "day": 19.11,
                    "night": 17.05,
                    "eve": 20.9,
                    "morn": 13.97
                },
                "pressure": 1008,
                "humidity": 58,
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "speed": 6.52,
                "deg": 254,
                "gust": 11.06,
                "clouds": 60,
                "pop": 0
            }
        ]
    };

// {
//   "cod": "404",
//   "message": "city not found"
// }

}
