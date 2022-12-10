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
    changeCategory(state, { payload: value }) {
      return {
        ...state,
        category: value,
      };
    },
    clearCategory(state) {
      return {
        ...state,
        category: '',
      };
    },
    changeProduct(state, { payload: value }) {
      return {
        ...state,
        product: value,
      };
    },
    changeSort(state, { payload: value }) {
      return {
        ...state,
        sort: value,
      };
    },
    changeMaterial(state, { payload: value }) {
      return {
        ...state,
        material: value,
      };
    },
  },
});

export const {
  changeCategory,
  clearCategory,
  changeProduct,
  changeSort,
  changeMaterial,
} = actions;

export default reducer;
