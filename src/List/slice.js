import { createSlice } from '@reduxjs/toolkit';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

const { actions, reducer } = createSlice({
  name: 'list',
  initialState: {
    product: '',
    category: '',
    sort: '',
    material: '',
  },
  reducers: {
    changeCategoriesDataField(
      state,
      { payload: { name, belong } },
    ) {
      return {
        ...state,
        [belong]: name,
      };
    },
  },
});

export const {
  changeCategoriesDataField,
} = actions;

export function checkUrl({ name, belong }) {
  return (dispatch, getState) => {
    function returnEntries(kind) {
      const { list } = getState();

      const { url } = LIST_CATEGORIES;

      return Object.entries(list)
        .filter((category) => url[kind].includes(category[0]));
    }

    function makePathname() {
      const pathname = ['/search'];

      const pathnameEntries = returnEntries('pathnames');

      for (let i = 0; i < pathnameEntries.length; i += 1) {
        const category = pathnameEntries[i];

        if (category[0] === 'category' && category[1]) {
          pathname.push(`/${category[1]}`);
        }

        if (category[0] === 'product' && category[1]) {
          pathname.push(`/product/${category[1]}`);
        }
      }

      return pathname;
    }

    function makeSearch() {
      const search = [];

      const searchEntries = returnEntries('searchs');

      for (let i = 0; i < searchEntries.length; i += 1) {
        const category = searchEntries[i];

        if (search.length >= 1 && category[1]) {
          search.push(`&${category[0]}=${category[1]}`);
        }

        if (search.length === 0 && category[1]) {
          search.push(`?${category[0]}=${category[1]}`);
        }
      }

      return search;
    }

    dispatch(changeCategoriesDataField({ name, belong }));

    return [...makePathname(), ...makeSearch()].join('');
  };
}

export default reducer;
