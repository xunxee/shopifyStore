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
        category: '',
      };

      const { category } = reducer(
        initialState,
        changesCategories('new'),
      );

      expect(category).toBe('new');
    });
  });

  describe('clearCategories', () => {
    it('clears categories', () => {
      const initialState = {
        category: 'new',
      };

      const { category } = reducer(
        initialState,
        clearCategories(),
      );

      expect(category).toBe('');
    });
  });

  describe('setIsProducts', () => {
    it('changes products', () => {
      const initialState = {
        product: '',
      };

      const { product } = reducer(
        initialState,
        changesProducts('sofas'),
      );

      expect(product).toBe('sofas');
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
