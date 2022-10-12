import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './LoginPage/slice';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
