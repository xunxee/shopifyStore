import MOCK_HOME_PAGE_PRODUCT_LIST from '../../fixtures/HomePage/homePageProductList';

import reducer, {
  setHomePageProductList,
} from './slice';

describe('reducer', () => {
  describe('setHomePageProductList', () => {
    it('changes homePageProductList', () => {
      const initialState = {
        homePageProductList: [],
      };

      const { homePageProductList } = reducer(
        initialState,
        setHomePageProductList(MOCK_HOME_PAGE_PRODUCT_LIST),
      );

      expect(homePageProductList).toBe(MOCK_HOME_PAGE_PRODUCT_LIST);
    });
  });
});
