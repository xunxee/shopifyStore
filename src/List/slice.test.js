import reducer, {
  changesCategories,
} from './slice';

describe('reducer', () => {
  describe('setIsCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: '',
      };

      const { categories } = reducer(
        initialState,
        changesCategories('New Arrivals'),
      );

      expect(categories).toBe('New Arrivals');
    });
  });
});
