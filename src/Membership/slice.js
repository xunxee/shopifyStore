import { createSlice } from '@reduxjs/toolkit';

import { postLogin, postSignUp } from '../services/api';

import { saveItem } from '../services/storage';

import INPUT_LIST from '../../fixtures/Membership/inputList';
import VALID_FIELDS from '../../fixtures/Membership/validFields';

const initialLoginFields = {
  email: {
    value: '',
    validationMessage: '',
  },
  password: {
    value: '',
    validationMessage: '',
  },
  firstName: {
    value: '',
    validationMessage: '',
  },
  lastName: {
    value: '',
    validationMessage: '',
  },
  error: '',
};

const { actions, reducer } = createSlice({
  name: 'membership',
  initialState: {
    isAccountModalOpen: false,
    isLogin: true,
    isButtonActive: false,
    accountFields: initialLoginFields,
    refreshToken: '',
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

    changeAccountFields(state, { payload: { name, value } }) {
      const { accountFields } = state;

      return {
        ...state,
        accountFields: {
          ...accountFields,
          [name]: {
            value,
            validationMessage: accountFields[name].validationMessage,
          },
        },
      };
    },

    changeInvalidCheckMessage(state, { payload: { name, validationMessage } }) {
      const { accountFields } = state;

      return {
        ...state,
        accountFields: {
          ...accountFields,
          [name]: {
            value: accountFields[name].value,
            validationMessage,
          },
        },
      };
    },

    changeAccountErrorMessage(state, { payload: { name, value } }) {
      const { accountFields } = state;

      return {
        ...state,
        accountFields: {
          ...accountFields,
          [name]: value,
        },
      };
    },

    clearAccountFields(state) {
      return {
        ...state,
        accountFields: initialLoginFields,
      };
    },

    clearInvalidCheckMessage(state, { payload: name }) {
      const { accountFields } = state;
      return {
        ...state,
        accountFields: {
          ...accountFields,
          [name]: {
            value: accountFields[name].value,
            validationMessage: '',
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
  changeAccountFields,
  changeInvalidCheckMessage,
  changeAccountErrorMessage,
  clearAccountFields,
  clearInvalidCheckMessage,
  setRefreshToken,
  logout,
  setButtonActive,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    dispatch(
      changeAccountErrorMessage({
        name: 'error',
        value: 'Loading......',
      }),
    );

    const {
      membership: {
        accountFields: {
          email: { value: email },
          password: { value: password },
        },
      },
    } = getState();

    try {
      const { refreshToken } = await postLogin({ email, password });

      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setIsAccountModalOpen());
    } catch (error) {
      dispatch(
        changeAccountErrorMessage({
          name: 'error',
          value: 'Check your ID or password',
        }),
      );
    }
  };
}

export function requestSignUp() {
  return async (dispatch, getState) => {
    dispatch(
      changeAccountErrorMessage({
        name: 'error',
        value: 'Loading......',
      }),
    );

    const {
      membership: {
        accountFields: {
          email: { value: email },
          password: { value: password },
        },
      },
    } = getState();

    try {
      const { refreshToken } = await postSignUp({ email, password });

      saveItem('refreshToken', refreshToken);

      dispatch(setRefreshToken(refreshToken));
      dispatch(setIsAccountModalOpen());
    } catch (error) {
      dispatch(
        changeAccountErrorMessage({
          name: 'error',
          value: '이미 존재하는 아이디입니다.',
        }),
      );
    }
  };
}

export function checkInputValue({ name, value }) {
  function makeValidationMessage() {
    if (!value) {
      return `${INPUT_LIST[name]} 필수 입력란입니다.`;
    }

    if (!VALID_FIELDS[name]) return '';

    const { regexps, invalidMessage } = VALID_FIELDS[name];

    const isValid = regexps.test(value);

    return isValid ? '' : invalidMessage;
  }

  return (dispatch) => {
    const validationMessage = makeValidationMessage();

    dispatch(changeInvalidCheckMessage({ name, validationMessage }));
  };
}

export function checkMemberInfo({ name, value }) {
  return (dispatch, getState) => {
    const {
      membership: { isLogin, accountFields, isButtonActive },
    } = getState();

    function validateRestSignUpFields() {
      const { error, ...restSignUpFields } = accountFields;

      delete restSignUpFields[name];

      const restSignUpFieldsEntries = Object.entries(restSignUpFields);

      for (let i = 0; i < restSignUpFieldsEntries.length; i += 1) {
        const [, { value: restSignUpFieldValue, validationMessage }] =
          restSignUpFieldsEntries[i];

        if (!restSignUpFieldValue) return false;

        if (validationMessage) return false;
      }

      return true;
    }

    function validateAccountFields() {
      if (!value) return false;

      if (isLogin) {
        const { email, password } = accountFields;

        return !!(email.value && password.value);
      }

      if (!validateRestSignUpFields()) return false;

      if (!VALID_FIELDS[name]) return true;

      return VALID_FIELDS[name].regexps.test(value);
    }

    const isValid = validateAccountFields();

    if (isButtonActive === isValid) return;

    if (!isValid) {
      dispatch(setButtonActive(false));

      return;
    }

    if (accountFields[name].validationMessage) {
      dispatch(clearInvalidCheckMessage(name));
    }

    dispatch(setButtonActive(true));
  };
}

export default reducer;
