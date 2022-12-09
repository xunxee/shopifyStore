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
    changesProducts(state, { payload: value }) {
      return {
        ...state,
        products: value,
      };
    },
  },
});

export const {
  changesCategories,
  changesProducts,
} = actions;

export default reducer;
