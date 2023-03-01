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
    isCareModalOpen: false,
    isDetailsModalOpen: false,
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

    selectColor(state, { payload: selectedColor }) {
      return {
        ...state,
        selectedColor,
      };
    },

    setIsModalOpen(state, { payload: { name } }) {
      const key = {
        care: 'isCareModalOpen',
        details: 'isDetailsModalOpen',
      };

      return {
        ...state,
        [key[name]]: !state[key[name]],
      };
    },
  },
});

export const {
  setProduct,
  selectSize,
  selectColor,
  setIsModalOpen,
} = actions;

export function loadProduct() {
  return async (dispatch) => {
    const product = await fetchMockProduct();
    dispatch(setProduct(product));
  };
}

export default reducer;
