import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'list',
  initialState: {
    lightOnCategory: '',
    category: '',
    product: '',
    sort: '',
    material: '',
  },
  reducers: {
    changeLightOnCategory(
      state,
      { payload: name },
    ) {
      return {
        ...state,
        lightOnCategory: name,
      };
    },
    changeAllCategories(
      state,
      { payload: { name, belong } },
    ) {
      return {
        ...state,
        [belong]: name,
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
  changeLightOnCategory,
  changeAllCategories,
  changeSort,
  changeMaterial,
} = actions;

export default reducer;
