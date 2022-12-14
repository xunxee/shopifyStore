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

export default reducer;
