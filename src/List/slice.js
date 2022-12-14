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
    changeAllCategories(
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
  changeAllCategories,
} = actions;

export default reducer;
