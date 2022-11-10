import { createSlice } from '@reduxjs/toolkit';

import { postLogin } from '../services/api';

import { saveItem } from '../services/storage';

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    isLoginModalOpen: false,
    isLogoutModalOpen: false,
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
      uid: '',
    },
  },
  reducers: {
    setIsLoginModalOpen(state) {
      const { isLoginModalOpen } = state;
      return {
        ...state,
        isLoginModalOpen: !isLoginModalOpen,
      };
    },

    setIsLogoutModalOpen(state) {
      const { isLogoutModalOpen } = state;
      return {
        ...state,
        isLogoutModalOpen: !isLogoutModalOpen,
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

    setAccountInfo(state, { payload: uid }) {
      const { accountInfo } = state;
      return {
        ...state,
        accountInfo: {
          ...accountInfo,
          uid,
        },
      };
    },
  },
});

export const {
  setIsLoginModalOpen,
  setIsLogoutModalOpen,
  setIsLogin,
  changeLoginFields,
  setRefreshToken,
  setAccountInfo,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    const {
      login: {
        loginFields: { email, password },
      },
    } = getState();

    try {
      const { refreshToken, localId: uid } = await postLogin(
        { email, password },
      );

      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setAccountInfo(uid));
      dispatch(setIsLoginModalOpen());
    } catch (error) {
      dispatch(changeLoginFields(
        { name: 'error', value: 'Check your ID or password' },
      ));
    }
  };
}

export function requestSignup() {
  //
}

export default reducer;
