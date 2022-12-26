import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  changeUrlDataField,
  changeUrlAllDataFields,
  setProductList,
  loadProductList,
} from './slice';

import { fetchMockData } from '../services/api';

import MOCK_DATA from '../../fixtures/fetchMockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  describe('changeUrlDataField', () => {
    it('change url data field', () => {
      const initialState = {
        url: {
          category: '',
        },
      };

      const { url: { category } } = reducer(
        initialState,
        changeUrlDataField({
          name: 'new',
          belong: 'category',
        }),
      );

      expect(category).toBe('new');
    });
  });

  describe('changeUrlAllDataFields', () => {
    it('change url all data field', () => {
      const initialState = {
        url: {
          product: '',
          category: '',
          sort: '',
          material: '',
        },
      };

      const { url } = reducer(
        initialState,
        changeUrlAllDataFields({
          product: 'beds',
          category: 'new',
          sort: 'trending',
          material: 'fabric',
        }),
      );

      expect(url).toEqual({
        product: 'beds',
        category: 'new',
        sort: 'trending',
        material: 'fabric',
      });
    });
  });

  describe('setProductList', () => {
    it('changes productList', () => {
      const initialState = {
        productList: [],
      };

      const { productList } = reducer(
        initialState,
        setProductList(MOCK_DATA),
      );

      expect(productList).toBe(MOCK_DATA);
    });
  });
});

describe('actions', () => {
  let store;

  function makeMockStore({
    productList = [],
  } = {}) {
    return mockStore({
      list: {
        productList,
      },
    });
  }

  describe('loadProductList', () => {
    beforeEach(() => {
      store = makeMockStore();

      fetchMockData.mockResolvedValue([]);
    });

    it('runs setProductList', async () => {
      await store.dispatch(loadProductList());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProductList([]));
    });
  });
});
