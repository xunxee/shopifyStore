import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  changeCategoriesDataField,
  checkUrl,
} from './slice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('reducer', () => {
  describe('changeCategoriesDataField', () => {
    it('change categories', () => {
      const initialState = {
        category: '',
      };

      const { category } = reducer(
        initialState,
        changeCategoriesDataField({
          name: 'new',
          belong: 'category',
        }),
      );

      expect(category).toBe('new');
    });
  });
});

describe('actions', () => {
  let store;

  function makeMockStore({
    product = '',
    category = '',
    sort = '',
    material = '',
  } = {}) {
    return mockStore({
      list: {
        product,
        category,
        sort,
        material,
      },
    });
  }

  describe('checkUrl', () => {
    context('when it clicks New Arrivals', () => {
      beforeEach(() => {
        store = makeMockStore({
          category: 'new',
        });
      });

      it('changes url to /search/new', () => {
        store.dispatch(checkUrl({
          name: 'new',
          belong: 'category',
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: { belong: 'category', name: 'new' },
          type: 'list/changeCategoriesDataField',
        });
      });
    });

    context('when it clicks Sofas', () => {
      beforeEach(() => {
        store = makeMockStore({
          product: 'sofas',
        });
      });

      it('changes url to /search/product/sofas', () => {
        store.dispatch(checkUrl({
          name: 'sofas',
          belong: 'product',
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: { belong: 'product', name: 'sofas' },
          type: 'list/changeCategoriesDataField',
        });
      });
    });

    context('when it clicks Trending', () => {
      beforeEach(() => {
        store = makeMockStore({
          sort: 'trending',
        });
      });

      it('changes url to /search?sort=trending', () => {
        store.dispatch(checkUrl({
          name: 'trending',
          belong: 'sort',
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: { belong: 'sort', name: 'trending' },
          type: 'list/changeCategoriesDataField',
        });
      });
    });

    context('when there is sort and click fabric', () => {
      beforeEach(() => {
        store = makeMockStore({
          sort: 'trending',
          material: 'fabric',
        });
      });

      it('changes url to /search?sort=trending&material=fabric', () => {
        store.dispatch(checkUrl({
          name: 'fabric',
          belong: 'trending',
        }));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
          payload: { belong: 'trending', name: 'fabric' },
          type: 'list/changeCategoriesDataField',
        });
      });
    });
  });
});
