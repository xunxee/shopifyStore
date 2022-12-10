import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'list',
  initialState: {
    category: '',
    product: '',
    sort: '',
    material: '',
  },
  reducers: {
    changesCategories(state, { payload: value }) {
      return {
        ...state,
        category: value,
      };
    },
    clearCategories(state) {
      return {
        ...state,
        category: '',
      };
    },
    changesProducts(state, { payload: value }) {
      return {
        ...state,
        product: value,
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
  clearCategories,
  changesProducts,
  changesSort,
  changesMaterial,
} = actions;

export default reducer;
