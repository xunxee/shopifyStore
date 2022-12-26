import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'list',
  initialState: {
    url: {
      product: '',
      category: '',
      sort: '',
      material: '',
    },
    productList: [],
  },
  reducers: {
    changeUrlDataField(
      state,
      { payload: { name, belong } },
    ) {
      const { url } = state;
      return {
        ...state,
        url: {
          ...url,
          [belong]: name,
        },
      };
    },

    changeUrlAllDataFields(state, {
      payload: object,
    }) {
      const { url } = state;
      return {
        ...state,
        url: {
          ...url,
          ...object,
        },
      };
    },

    setProductList(state, { payload: productList }) {
      return {
        ...state,
        productList,
      };
    },
  },
});

export const {
  changeUrlDataField,
  changeUrlAllDataFields,
  setProductList,
} = actions;

export default reducer;
