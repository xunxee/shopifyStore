import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    isModal: false,
    isLogin: true,
    loginFields: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  },
  reducers: {
    setIsModal(state) {
      const { isModal } = state;
      return {
        ...state,
        isModal: !isModal,
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
  setIsModal,
  setIsLogin,
  changeLoginFields,
} = actions;

export default reducer;
