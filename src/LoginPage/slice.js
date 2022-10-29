import { createSlice } from '@reduxjs/toolkit';

import { postLogin } from '../services/api';

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    isModalOpen: false,
    isLogin: true,
    loginFields: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
    },
    accessToken: '',
  },
  reducers: {
    setIsModalOpen(state) {
      const { isModalOpen } = state;
      return {
        ...state,
        isModalOpen: !isModalOpen,
      };
    },

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

    setAccessToken() {
      //
    },
  },
});

export const {
  setIsModalOpen,
  setIsLogin,
  changeLoginFields,
  setAccessToken,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    const { login: { loginFields: { email, password } } } = getState();

    try {
      const data = await postLogin({ email, password });

      const { refreshToken } = data;
    } catch (error) {
      console.log(error);
    }
  };
}

export function requestSignup() {
  //
}

export default reducer;
