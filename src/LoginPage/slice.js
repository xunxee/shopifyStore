import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    isLogin: true,
    loginFields: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  },
  reducers: {
    setIsLogin(state) {
      const { isLogin } = state;
      return {
        ...state,
        isLogin: !isLogin,
      };
    },

    changeLoginFields(state, { payload: { name, value } }) {
      const { loginFields } = state;
      return {
        ...state,
        loginFields: {
          ...loginFields,
          [name]: value,
        },
      };
    },
  },
});

export const {
  setIsLogin,
  changeLoginFields,
} = actions;

export default reducer;
