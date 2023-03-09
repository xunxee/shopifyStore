import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import MOCK_HOME_PAGE_PRODUCT_LIST from '../../fixtures/HomePage/homePageProductList';

import reducer, {
  loadHomePageProductList,
  setHomePageProductList,
} from './slice';

import { fetchMockHomePageProductList } from '../services/api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  describe('setHomePageProductList', () => {
    it('changes homePageProductList', () => {
      const initialState = {
        homePageProductList: [],
      };

      const { homePageProductList } = reducer(
        initialState,
        setHomePageProductList(MOCK_HOME_PAGE_PRODUCT_LIST),
      );

      expect(homePageProductList).toBe(MOCK_HOME_PAGE_PRODUCT_LIST);
    });
  });
});

describe('actions', () => {
  let store;

  function makeMockStore(
    { homePageProductList = [] } = {},
  ) {
    return mockStore({
      homePage: {
        homePageProductList,
      },
    });
  }

  describe('loadHomePageProductList', () => {
    beforeEach(() => {
      store = makeMockStore();

      fetchMockHomePageProductList.mockResolvedValue([]);
    });

    it('runs setHomePageProductList', async () => {
      await store.dispatch(loadHomePageProductList());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setHomePageProductList([]));
    });
  });
});
