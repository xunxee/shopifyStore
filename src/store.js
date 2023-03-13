import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './Header/slice';
import membershipReducer from './Membership/slice';
import listPageReducer from './List/slice';
import productDetailReducer from './ProductDetail/slice';
import homePageReducer from './HomePage/slice';

const store = configureStore({
  reducer: {
    header: headerReducer,
    membership: membershipReducer,
    list: listPageReducer,
    productDetail: productDetailReducer,
    homePage: homePageReducer,
  },
});

export default store;
