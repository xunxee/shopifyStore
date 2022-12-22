import { configureStore } from '@reduxjs/toolkit';

import controlMemberReducer from './ControlMember/slice';
import listPageReducer from './List/slice';

const store = configureStore({
  reducer: {
    controlMember: controlMemberReducer,
    list: listPageReducer,
  },
});

export default store;
