import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './LoginPage/slice';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
