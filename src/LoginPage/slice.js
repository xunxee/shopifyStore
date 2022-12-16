import { createSlice } from '@reduxjs/toolkit';

import { postLogin, postSignUp } from '../services/api';

import { saveItem } from '../services/storage';

import INPUT_LIST from '../../fixtures/inputList';
import VALID_FIELDS from '../../fixtures/validFields';

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
    isButtonActive: false,
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
        isLogin: true,
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

    clearInvalidCheckMessage(state, { payload: name }) {
      const { loginFields } = state;
      return {
        ...state,
        loginFields: {
          ...loginFields,
          [name]: {
            value: loginFields[name].value,
            invalidCheckMessage: '',
          },
        },
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

    setButtonActive(state, { payload: isButtonActive }) {
      return {
        ...state,
        isButtonActive,
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
  clearInvalidCheckMessage,
  setRefreshToken,
  logout,
  setAccountInfo,
  setButtonActive,
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
      const {
        refreshToken,
        localId: uid,
      } = await postLogin({ email, password });

      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setAccountInfo(uid));
      dispatch(setIsAccountModalOpen());
    } catch (error) {
      dispatch(changeLoginErrorMessage({
        name: 'error',
        value: 'Check your ID or password',
      }));
    }
  };
}

export function requestSignUp() {
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
      const {
        refreshToken,
        localId: uid,
      } = await postSignUp({ email, password });

      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setAccountInfo(uid));
      dispatch(setIsAccountModalOpen());
    } catch (error) {
      dispatch(changeLoginErrorMessage({
        name: 'error', value: '이미 존재하는 아이디입니다.',
      }));
    }
  };
}

export function checkSignUpValid({ name, value }) {
  function validationCheckList() {
    if (!value) {
      return `${INPUT_LIST[name]} 필수 입력란입니다.`;
    }

    if (!VALID_FIELDS[name]) return '';

    const {
      regexps,
      invalidMessage,
    } = VALID_FIELDS[name];

    const isValid = regexps.test(value);

    return isValid ? '' : invalidMessage;
  }

  return (dispatch) => {
    const invalidCheckMessage = validationCheckList();

    dispatch(changeInvalidCheckMessage(
      { name, invalidCheckMessage },
    ));
  };
}

export function checkInvalidMessageClear({
  name, value,
}) {
  return async (dispatch, getState) => {
    await dispatch(changeLoginFields({ name, value }));

    const { login: { isLogin, loginFields } } = getState();

    const {
      email, password, lastName, firstName,
    } = loginFields;

    function checkValid() {
      if (isLogin) return email.value && password.value;

      if (!(email.value && password.value
        && firstName.value && lastName.value)) return false;

      if (!VALID_FIELDS[name]
        && !email.invalidCheckMessage
        && !password.invalidCheckMessage) return true;

      const { regexps } = VALID_FIELDS[name];
      return regexps.test(value);
    }

    const isValid = checkValid();

    if (!isValid) {
      dispatch(setButtonActive(isValid));
      return;
    }

    dispatch(setButtonActive(isValid));

    dispatch(clearInvalidCheckMessage(name));
  };
}

export default reducer;
