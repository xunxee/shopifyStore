import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMockProduct,
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
    product: {},
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

    setProduct(state, { payload: product }) {
      return {
        ...state,
        product,
      };
    },
  },
});

export const {
  changeUrlDataField,
  changeUrlAllDataFields,
  setProductList,
  setProduct,
} = actions;

export function loadProductList() {
  return async (dispatch) => {
    const productList = await fetchMockProductList();
    dispatch(setProductList(productList));
  };
}

export function loadProduct() {
  return async (dispatch) => {
    const product = await fetchMockProduct();
    dispatch(setProduct(product));
  };
}

export default reducer;
