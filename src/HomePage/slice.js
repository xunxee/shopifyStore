import { createSlice } from '@reduxjs/toolkit';
import { fetchMockHomePageProductList } from '../services/api';

const { actions, reducer } = createSlice({
  name: 'homePage',
  initialState: {
    homePageProductList: {
      topProductList: [],
      recommendedProductList: [],
    },
  },
  reducers: {
    setHomePageProductList(state, { payload: homePageProductList }) {
      return {
        ...state,
        homePageProductList,
      };
    },
  },
});

export const { setHomePageProductList } = actions;

export function loadHomePageProductList() {
  return async (dispatch) => {
    const homePageProductList = await fetchMockHomePageProductList();
    dispatch(setHomePageProductList(homePageProductList));
  };
}

export default reducer;
