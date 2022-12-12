import reducer, {
  changeAllCategories,
  changeSort,
  changeMaterial,
  clearCategory,
} from './slice';

describe('reducer', () => {
  describe('changeAllCategories', () => {
    it('change categories', () => {
      const initialState = {
        category: '',
      };

      const { category } = reducer(
        initialState,
        changeAllCategories({
          name: 'new',
          belong: 'category',
        }),
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
