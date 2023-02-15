import { createSlice } from "@reduxjs/toolkit";

import { fetchMockProductList } from "../services/api";

import LIST_CATEGORIES from "../../fixtures/List/listCategoriesCollection";

const { initialCategoryList } = LIST_CATEGORIES;

const { actions, reducer } = createSlice({
  name: "list",
  initialState: {
    url: initialCategoryList,
    productList: [],
  },
  reducers: {
    changeUrlDataField(state, { payload: { name, belong } }) {
      const { url } = state;
      return {
        ...state,
        url: {
          ...url,
          [belong]: name,
        },
      };
    },

    changeUrlAllDataFields(state, { payload: object }) {
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

export const { changeUrlDataField, changeUrlAllDataFields, setProductList } =
  actions;

export function loadProductList() {
  return async (dispatch) => {
    const productList = await fetchMockProductList();
    dispatch(setProductList(productList));
  };
}

export default reducer;
