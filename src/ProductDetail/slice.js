import { createSlice } from '@reduxjs/toolkit';

import { fetchMockProduct } from '../services/api';

const { actions, reducer } = createSlice({
  name: 'productDetail',
  initialState: {
    product: {
      id: '',
      title: '',
      price: '',
      imageList: [],
      size: [],
      color: [],
      detail: '',
      evaluation: {
        starRating: '',
        review: [],
      },
      banners: [],
    },
    selectedSize: null,
    selectedColor: null,
  },
  reducers: {
    setProduct(state, { payload: product }) {
      return {
        ...state,
        product,
      };
    },

    selectSize(state, { payload: selectedSize }) {
      return {
        ...state,
        selectedSize,
      };
    },
  },
});

export const {
  setProduct,
  selectSize,
} = actions;

export function loadProduct() {
  return async (dispatch) => {
    const product = await fetchMockProduct();
    dispatch(setProduct(product));
  };
}

export default reducer;
