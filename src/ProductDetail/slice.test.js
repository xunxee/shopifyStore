import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setProduct,
  selectSize,
  selectColor,
  loadProduct,
  setIsModalOpen,
} from './slice';

import { fetchMockProduct } from '../services/api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
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

      const state = reducer(initialState, setProduct(product));

      expect(state.product.id).toBe(1);
      expect(state.product.name).toBe('Special Edition T-Shirt');
    });
  });

  describe('selectSize', () => {
    it('changes selected size', () => {
      const initialState = {
        selectedSize: 'null',
      };

      const state = reducer(initialState, selectSize('XL'));

      expect(state.selectedSize).toBe('XL');
    });
  });

  describe('selectColor', () => {
    it('changes selected color', () => {
      const initialState = {
        selectedSize: 'null',
      };

      const state = reducer(initialState, selectColor('black'));

      expect(state.selectedColor).toBe('black');
    });
  });

  describe('setIsModalOpen', () => {
    it('changes isCareModalOpen', () => {
      const initialState = {
        isCareModalOpen: 'false',
      };

      const { isCareModalOpen } = reducer(
        initialState,
        setIsModalOpen(
          {
            name: 'care',
          },
        ),
      );

      expect(isCareModalOpen).toBe(true);
    });

    it('changes isDetailsModalOpen', () => {
      const initialState = {
        isDetailsModalOpen: 'false',
      };

      const { isDetailsModalOpen } = reducer(
        initialState,
        setIsModalOpen(
          {
            name: 'details',
          },
        ),
      );

      expect(isDetailsModalOpen).toBe(true);
    });
  });
});

describe('actions', () => {
  let store;

  function makeMockStore({ productList = [], product = {} } = {}) {
    return mockStore({
      list: {
        productList,
        product,
      },
    });
  }

  describe('loadProduct', () => {
    beforeEach(() => {
      store = makeMockStore();

      fetchMockProduct.mockResolvedValue({});
    });

    it('runs setProduct', async () => {
      await store.dispatch(loadProduct());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setProduct({}));
    });
  });
});
