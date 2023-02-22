import reducer, { changeSearchBarFields } from './slice';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      searchBarFields: {
        value: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('changeSearchBarFields', () => {
    context('when searchBar is changed', () => {
      it('updates the searchBar value', () => {
        const initialState = {
          searchBarFields: {
            value: '',
          },
        };

        const {
          searchBarFields: { value },
        } = reducer(
          initialState,
          changeSearchBarFields({
            value: 'beds',
          }),
        );

        expect(value).toBe('beds');
      });
    });
  });
});
