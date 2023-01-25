import { configureStore } from '@reduxjs/toolkit';

import membershipReducer from './Membership/slice';
import listPageReducer from './List/slice';
import productDetailReducer from './ProductDetail/slice';

const store = configureStore({
  reducer: {
    membership: membershipReducer,
    list: listPageReducer,
    productDetail: productDetailReducer,
  },
});

export default store;
