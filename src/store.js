import { configureStore } from '@reduxjs/toolkit';

import loginReducer from './LoginPage/slice';
import listPageReducer from './List/slice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    list: listPageReducer,
  },
});

export default store;
