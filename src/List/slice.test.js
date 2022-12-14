import reducer, {
  changeAllCategories,
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
});
