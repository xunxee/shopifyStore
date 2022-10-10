import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    isLogin: true,
  },
  reducers: {
    setIsLoginState(state) {
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

export const {
  setIsLoginState,
  setTemporary,
} = actions;

export default reducer;
