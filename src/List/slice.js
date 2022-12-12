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
    changeAllCategories(
      state,
      { payload: { name, belong } },
    ) {
      return {
        ...state,
        [belong]: name,
      };
    },
    clearCategory(state) {
      return {
        ...state,
        category: '',
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
  changeAllCategories,
  clearCategory,
  changeSort,
  changeMaterial,
} = actions;

export default reducer;
