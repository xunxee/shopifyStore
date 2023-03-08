import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'homePage',
  initialState: {
    homePageProductList: [
      { topProductList: [] },
      { recommendProductList: [] },
    ],
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

export default reducer;
