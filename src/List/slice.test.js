import reducer, {
  changeCategory,
  changeProduct,
  changeSort,
  changeMaterial,
  clearCategory,
} from './slice';

describe('reducer', () => {
  describe('setIsCategories', () => {
    it('changes categories', () => {
      const initialState = {
        category: '',
      };

      const { category } = reducer(
        initialState,
        changeCategory('new'),
      );

      expect(category).toBe('new');
    });
  });

  describe('clearCategory', () => {
    it('clears categories', () => {
      const initialState = {
        category: 'new',
      };

      const { category } = reducer(
        initialState,
        clearCategory(),
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
        changeProduct('sofas'),
      );

      expect(product).toBe('sofas');
    });
  });

  describe('changeSort', () => {
    it('changes sort', () => {
      const initialState = {
        sort: '',
      };

      const { sort } = reducer(
        initialState,
        changeSort('trending'),
      );

      expect(sort).toBe('trending');
    });
  });

  describe('changeMaterial', () => {
    it('changes material', () => {
      const initialState = {
        material: '',
      };

      const { material } = reducer(
        initialState,
        changeMaterial('fabric'),
      );

      expect(material).toBe('fabric');
    });
  });
});
