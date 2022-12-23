import { configureStore } from '@reduxjs/toolkit';

import membershipReducer from './Membership/slice';
import listPageReducer from './List/slice';

const store = configureStore({
  reducer: {
    membership: membershipReducer,
    list: listPageReducer,
  },
});

export default store;
