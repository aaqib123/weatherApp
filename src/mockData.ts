import { AppState } from "./store/weather.models";

export const mockStoreData: AppState = {
  weatherState: {
    data: [
      {
        city: {
          id: 6324729,
          name: 'Halifax',
          coord: {
            lon: -63.5724,
            lat: 44.6453,
          },
          country: 'CA',
          population: 359111,
          timezone: -10800,
        },
        cod: '200',
        message: 0.1434821,
        cnt: 7,
        list: [
          {
            dt: 1627747200,
            sunrise: 1627721982,
            sunset: 1627774888,
            temp: {
              day: 19.58,
              min: 14.02,
              max: 21.43,
              night: 17.26,
              eve: 21.14,
              morn: 14.22,
            },
            feels_like: {
              day: 19.11,
              night: 17.05,
              eve: 20.9,
              morn: 13.97,
            },
            pressure: 1008,
            humidity: 58,
            weather: [
              {
                id: 803,
                main: 'Clouds',
                description: 'broken clouds',
                icon: '04d',
              },
            ],
            speed: 6.52,
            deg: 254,
            gust: 11.06,
            clouds: 60,
            pop: 0,
          },
        ],
      },
    ],
    loading: false,
    error: undefined,
  }
};
