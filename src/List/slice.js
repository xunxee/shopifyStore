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
    changesSort(state, { payload: value }) {
      return {
        ...state,
        sort: value,
      };
    },
    changesMaterial(state, { payload: value }) {
      return {
        ...state,
        material: value,
      };
    },
  },
});

export const {
  changesCategories,
  changesProducts,
  changesSort,
  changesMaterial,
} = actions;

export default reducer;
