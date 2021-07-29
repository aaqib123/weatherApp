import { mockStoreData } from 'src/mockData';
import { AppState } from './weather.models';
import {
  isLoading,
  selectCityData,
  selectCityLength,
  selectError
} from './weather.selector';

describe('Selectors', () => {
  let storeData: AppState = mockStoreData;

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
    let newStoreData: AppState = {
      ...storeData,
      weatherState: {
        ...storeData.weatherState,
        error: new Error('error msg'),
      },
    };
    const selectorVal = selectError.projector(newStoreData.weatherState);
    expect(selectorVal).toBeInstanceOf(Error);
    expect(selectorVal?.message).toEqual('error msg');
  });

  it('isLoading should return loading state', () => {
    const selectorVal = isLoading.projector(storeData.weatherState);
    expect(selectorVal).toBeInstanceOf(Boolean);
    expect(selectorVal).toBeFalsy();
  });
});
