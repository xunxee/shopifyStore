import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import MOCK_PRODUCT_LIST_DATA from '../../fixtures/List/productList';

import reducer, {
  changeUrlDataField,
  changeUrlAllDataFields,
  setProductList,
  loadProductList,
} from './slice';

import { fetchMockProductList } from '../services/api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  describe('changeUrlDataField', () => {
    it('update the query string/path of the URL', () => {
      const initialState = {
        url: {
          category: '',
        },
      };

      const {
        url: { category },
      } = reducer(
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
    it('update all the URL data fields', () => {
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
        setProductList(MOCK_PRODUCT_LIST_DATA),
      );

      expect(productList).toBe(MOCK_PRODUCT_LIST_DATA);
    });
  });
});

describe('actions', () => {
  let store;

  function makeMockStore(
    { productList = [], product = {} } = {},
  ) {
    return mockStore({
      list: {
        productList,
        product,
      },
    });
  }

  describe('loadProductList', () => {
    beforeEach(() => {
      store = makeMockStore();

      fetchMockProductList.mockResolvedValue([]);
    });

    it('runs setProductList', async () => {
      await store.dispatch(loadProductList());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProductList([]));
    });
  });
});
