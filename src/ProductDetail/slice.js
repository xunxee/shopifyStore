import { createSlice } from '@reduxjs/toolkit';

import {
  fetchMockProduct,
} from '../services/api';

const { actions, reducer } = createSlice({
  name: 'productDetail',
  initialState: {
    product: {},
    selectedImage: null,
  },
  reducers: {
    setProduct(state, { payload: product }) {
      return {
        ...state,
        product,
      };
    },
  },
});

export const {
  setProduct,
} = actions;

export function loadProduct() {
  return async (dispatch) => {
    const product = await fetchMockProduct();
    dispatch(setProduct(product));
  };
}

export default reducer;
