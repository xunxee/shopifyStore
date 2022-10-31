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
    refreshToken: '',
    accountInfo: {
      localId: '',
    },
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

    setRefreshToken(state, { payload: refreshToken }) {
      return {
        ...state,
        refreshToken,
      };
    },
  },
});

export const {
  setIsModalOpen,
  setIsLogin,
  changeLoginFields,
  setRefreshToken,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    const {
      login: {
        loginFields: { email, password },
      },
    } = getState();

    try {
      const data = await postLogin({ email, password });

      const { refreshToken, uid } = data;

      dispatch(setRefreshToken(refreshToken));
      // dispatch(setAccountInfo(uid));
    } catch (error) {
      // console.log(error);
    }
  };
}

export function requestSignup() {
  //
}

export default reducer;
