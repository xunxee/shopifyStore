import reducer, {
  changesCategories,
  changesProducts,
} from './slice';

describe('reducer', () => {
  describe('setIsCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: '',
      };

      const { categories } = reducer(
        initialState,
        changesCategories('new'),
      );

      expect(categories).toBe('new');
    });
  });

  describe('setIsProducts', () => {
    it('changes products', () => {
      const initialState = {
        products: '',
      };

      const { products } = reducer(
        initialState,
        changesProducts('sofas'),
      );

      expect(products).toBe('sofas');
    });
  });
});
