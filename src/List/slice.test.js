import reducer, {
  changeCategoriesDataField,
} from './slice';

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
