import { createSlice } from '@reduxjs/toolkit';

import { postLogin } from '../services/api';

import { saveItem } from '../services/storage';

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
      uid: '',
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
  setIsModalOpen,
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
      const data = await postLogin({ email, password });

      const { refreshToken, localId: uid } = data;

      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setAccountInfo(uid));
      dispatch(setIsModalOpen());
    } catch (error) {
      const message = {
        EMAIL_NOT_FOUND: 'Cannot find an account',
        INVALID_PASSWORD: 'Cannot find an password',
      };

      dispatch(changeLoginFields(
        { name: 'error', value: message[error.message] },
      ));
    }
  };
}

export function requestSignup() {
  //
}

export default reducer;
