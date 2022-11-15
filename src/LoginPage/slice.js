import { createSlice } from '@reduxjs/toolkit';

import { postLogin } from '../services/api';

import { saveItem } from '../services/storage';

const initialLoginFields = {
  email: {
    value: '',
    invalidCheckMessage: '',
  },
  password: {
    value: '',
    invalidCheckMessage: '',
  },
  firstName: {
    value: '',
    invalidCheckMessage: '',
  },
  lastName: {
    value: '',
    invalidCheckMessage: '',
  },
  error: '',
};

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    isAccountModalOpen: false,
    isLogin: true,
    loginFields: initialLoginFields,
    refreshToken: '',
    accountInfo: {
      uid: '',
    },
  },
  reducers: {
    setIsAccountModalOpen(state) {
      const { isAccountModalOpen } = state;
      return {
        ...state,
        isAccountModalOpen: !isAccountModalOpen,
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
          [name]: {
            value,
            invalidCheckMessage: loginFields[name].invalidCheckMessage,
          },
        },
      };
    },

    changeLoginErrorMessage(
      state,
      { payload: { name, value } },
    ) {
      const { loginFields } = state;

      return {
        ...state,
        loginFields: {
          ...loginFields,
          [name]: value,
        },
      };
    },

    clearLoginFields(state) {
      return {
        ...state,
        loginFields: initialLoginFields,
      };
    },

    setRefreshToken(state, { payload: refreshToken }) {
      return {
        ...state,
        refreshToken,
      };
    },

    logout(state) {
      return {
        ...state,
        refreshToken: '',
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
  setIsAccountModalOpen,
  setIsLogin,
  changeLoginFields,
  changeLoginErrorMessage,
  clearLoginFields,
  setRefreshToken,
  logout,
  setAccountInfo,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    dispatch(changeLoginErrorMessage({
      name: 'error', value: 'Loading......',
    }));

    const {
      login: {
        loginFields: {
          email: { value: email },
          password: { value: password },
        },
      },
    } = getState();

    try {
      const { refreshToken, localId: uid } = await postLogin(
        { email, password },
      );
      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setAccountInfo(uid));
      dispatch(setIsAccountModalOpen());
    } catch (error) {
      dispatch(changeLoginErrorMessage({
        name: 'error', value: 'Check your ID or password',
      }));
    }
  };
}

export function requestSignup() {
  //
}

export default reducer;
