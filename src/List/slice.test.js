import reducer, {
  changesCategories,
  changesProducts,
  changesSort,
  changesMaterial,
  clearCategories,
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

  describe('clearCategories', () => {
    it('clears categories', () => {
      const initialState = {
        categories: 'new',
      };

      const { categories } = reducer(
        initialState,
        clearCategories(),
      );

      expect(categories).toBe('');
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

  describe('changesSort', () => {
    it('changes sort', () => {
      const initialState = {
        sort: '',
      };

      const { sort } = reducer(
        initialState,
        changesSort('trending'),
      );

      expect(sort).toBe('trending');
    });
  });

  describe('changesMaterial', () => {
    it('changes material', () => {
      const initialState = {
        material: '',
      };

      const { material } = reducer(
        initialState,
        changesMaterial('fabric'),
      );

      expect(material).toBe('fabric');
    });
  });
});
