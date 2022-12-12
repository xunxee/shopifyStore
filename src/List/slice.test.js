import reducer, {
  changeLightOnCategory,
  changeAllCategories,
  changeSort,
  changeMaterial,
} from './slice';

describe('reducer', () => {
  describe('changeLightOnCategory', () => {
    it('change lightOnCategory', () => {
      const initialState = {
        lightOnCategory: '',
      };

      const { lightOnCategory } = reducer(
        initialState,
        changeLightOnCategory('all'),
      );

      expect(lightOnCategory).toBe('all');
    });
  });

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
