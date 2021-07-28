import {
  AppState,
  fullState,
  selectCityData,
  selectCityLength,
  selectError,
  selectIsLoading,
} from './weather.selector';

describe('Selectors', () => {
  let storeData: AppState = {
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
    },
  };

  it('selectCityData selector returns weather object', () => {
    const selectorVal = selectCityData.projector(storeData.weatherState);
    expect(selectorVal).toBeTruthy();
    expect(selectorVal[0].city.name).toBeInstanceOf(String);
    expect(selectorVal[0].city.name).toEqual('Halifax');
  });

  it('selectCityLength should returns number of cities added', () => {
    const selectorVal = selectCityLength.projector(storeData.weatherState);
    expect(selectorVal).toEqual(1);
  });

  it('selectError should return undefined for default state', () => {
    const selectorVal = selectError.projector(storeData.weatherState);
    expect(selectorVal).toBeUndefined();
  });

  it('selectError should return error', () => {
    let newStoreData:AppState = {
      ...storeData,
      weatherState: {
        ...storeData.weatherState,
        error: new Error('error msg')
      },
    };
    const selectorVal = selectError.projector(newStoreData.weatherState);
    expect(selectorVal).toBeInstanceOf(Error);
    expect(selectorVal?.message).toEqual('error msg');
  });

  it('selectIsLoading should return loading state', () => {
    const selectorVal = selectIsLoading.projector(storeData.weatherState);
    expect(selectorVal).toBeInstanceOf(Boolean);
    expect(selectorVal).toBeFalsy();
  });
});
