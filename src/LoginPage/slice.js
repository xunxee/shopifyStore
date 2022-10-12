import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    isLogin: true,
  },
  reducers: {
    setIsLogin(state) {
      const { isLogin } = state;
      return {
        ...state,
        isLogin: !isLogin,
      };
    },

    setTemporary(state) {
      return {
        ...state,
      };
    },
  },
});

console.log(reducer);

export const {
  setIsLogin,
  setTemporary,
} = actions;

export default reducer;
