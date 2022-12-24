import reducer, {
  changeUrlDataField,
  changeUrlAllDataFields,
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

  describe('changeUrlAllDataFields', () => {
    it('change url all data field', () => {
      const initialState = {
        url: {
          product: '',
          category: '',
          sort: '',
          material: '',
        },
      };

      const { url } = reducer(
        initialState,
        changeUrlAllDataFields({
          product: 'beds',
          category: 'new',
          sort: 'trending',
          material: 'fabric',
        }),
      );

      expect(url).toEqual({
        product: 'beds',
        category: 'new',
        sort: 'trending',
        material: 'fabric',
      });
    });
  });
});
