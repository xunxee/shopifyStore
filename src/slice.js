import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    isLoginState: true,
  },
  reducers: {
    setIsLoginState(state) {
      const { isLoginState } = state;
      return {
        ...state,
        isLoginState: !isLoginState,
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
