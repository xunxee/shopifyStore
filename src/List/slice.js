import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'list',
  initialState: {
    categories: '',
    products: '',
    sort: '',
    material: '',
  },
  reducers: {
    changesCategories(state, { payload: value }) {
      return {
        ...state,
        categories: value,
      };
    },
  },
});

export const { changesCategories } = actions;

export default reducer;
