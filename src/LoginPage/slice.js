import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const {
  setIsModalOpen,
  setIsLogin,
  changeLoginFields,
} = actions;

export function requestLogin() {
  //
}

export function requestSignup() {
  //
}

export default reducer;
