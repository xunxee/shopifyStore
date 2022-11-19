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

    changeLoginFields(
      state,
      { payload: { name, value } },
    ) {
      const { loginFields } = state;

      return {
        ...state,
        loginFields: {
          ...loginFields,
          [name]: {
            value,
            invalidCheckMessage:
              loginFields[name].invalidCheckMessage,
          },
        },
      };
    },

    changeInvalidCheckMessage(
      state,
      { payload: { name, invalidCheckMessage } },
    ) {
      const { loginFields } = state;

      return {
        ...state,
        loginFields: {
          ...loginFields,
          [name]: {
            value: loginFields[name].value,
            invalidCheckMessage,
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
  changeInvalidCheckMessage,
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

export function requestSignUp() {
  //
}

export function checkSignUpValid({ name, value }) {
  function validationCheckList({ inputValue }) {
    if (!inputValue) {
      const inputList = {
        lastName: 'Last Name은',
        firstName: 'First Name은',
        email: 'Email은',
        password: 'Password는',
      };

      return `${inputList[name]} 필수 입력란입니다.`;
    }

    const isEmailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
      .test(value);

    if (name === 'email' && !isEmailCheck) {
      return 'Email은 숫자나 문자로 시작하고 @를 포함해야합니다.';
    }

    const isPasswordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/
      .test(value);

    if (name === 'password' && !isPasswordCheck) {
      return 'Password는 숫자, 알파벳 소문자, 알파벳 대문자, 특수문자(!, @, #)을 포함한 8자리 이상의 문자여야합니다.';
    }

    return '';
  }

  return (dispatch) => {
    const invalidCheckMessage = validationCheckList({
      inputValue: value,
    });

    dispatch(changeInvalidCheckMessage(
      { name, invalidCheckMessage },
    ));
  };
}

export default reducer;
