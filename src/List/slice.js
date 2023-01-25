import { createSlice } from '@reduxjs/toolkit';

import {
  fetchMockProductList,
} from '../services/api';

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

export function loadProductList() {
  return async (dispatch) => {
    const productList = await fetchMockProductList();
    dispatch(setProductList(productList));
  };
}

export default reducer;
