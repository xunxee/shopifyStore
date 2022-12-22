import reducer, {
  changeUrlDataField,
} from './slice';

describe('reducer', () => {
  describe('changeUrlDataField', () => {
    it('change url data field', () => {
      const initialState = {
        url: {
          category: '',
        },
      };

      const { url: { category } } = reducer(
        initialState,
        changeUrlDataField({
          name: 'new',
          belong: 'category',
        }),
      );

      expect(category).toBe('new');
    });
  });
});
