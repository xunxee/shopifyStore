import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  changeUrlDataField,
  changeUrlAllDataFields,
  setProductList,
  setProduct,
  loadProductList,
} from './slice';

import { fetchMockProductList } from '../services/api';

import MOCK_PRODUCT_LIST_DATA from '../../fixtures/MockData/MockProductListData';

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
        setProductList(MOCK_PRODUCT_LIST_DATA),
      );

      expect(productList).toBe(MOCK_PRODUCT_LIST_DATA);
    });
  });

  describe('setProduct', () => {
    it('changes product', () => {
      const initialState = {
        product: {},
      };

      const product = {
        id: 1,
        name: 'Special Edition T-Shirt',
        price: '$50.00 USD',
      };

      const state = reducer(
        initialState,
        setProduct(product),
      );

      expect(state.product.id).toBe(1);
      expect(state.product.name)
        .toBe('Special Edition T-Shirt');
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

      fetchMockProductList.mockResolvedValue([]);
    });

    it('runs setProductList', async () => {
      await store.dispatch(loadProductList());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProductList([]));
    });
  });
});
