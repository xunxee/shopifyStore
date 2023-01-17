import {
  postLogin,
  postSignUp,
  fetchMockProductList,
  fetchMockProduct,
} from './api';

import LOGIN_TOKENS from '../../fixtures/loginTokens';
import POST_LOGIN_DATA from '../../fixtures/postLoginData';
import LOGIN_FAIL_DATA from '../../fixtures/loginFailData';
import SIGNUP_FAIL_DATA from '../../fixtures/signUpFailData';
import MOCK_PRODUCT_LIST_DATA from '../../fixtures/MockData/productList';
import MOCK_PRODUCT_DATA from '../../fixtures/MockData/product';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('postLogin', () => {
    context('when login successful', () => {
      beforeEach(() => {
        mockFetch(LOGIN_TOKENS);
      });

      it('returns loginTokens', async () => {
        const data = await postLogin(POST_LOGIN_DATA);

        expect(data).toEqual(LOGIN_TOKENS);
      });
    });

    context('when login fails', () => {
      beforeEach(() => {
        mockFetch(LOGIN_FAIL_DATA);
      });

      it('throw an error', async () => {
        await expect(async () => {
          await postLogin(POST_LOGIN_DATA);
        }).rejects.toThrowError(new Error('INVALID_PASSWORD'));
      });
    });
  });

  describe('postSignUp', () => {
    context('when "sign up" successful', () => {
      beforeEach(() => {
        mockFetch(LOGIN_TOKENS);
      });

      it('returns loginTokens', async () => {
        const data = await postSignUp(POST_LOGIN_DATA);

        expect(data).toEqual(LOGIN_TOKENS);
      });
    });

    context('when "sign up" fails', () => {
      beforeEach(() => {
        mockFetch(SIGNUP_FAIL_DATA);
      });

      it('throw an error', async () => {
        await expect(async () => {
          await postSignUp(SIGNUP_FAIL_DATA);
        }).rejects.toThrowError(new Error('ID_ALREADY_EXISTS'));
      });
    });
  });

  describe('fetchMockProductList', () => {
    beforeEach(() => {
      mockFetch(MOCK_PRODUCT_LIST_DATA);
    });

    it('returns mock data', async () => {
      const mockData = await fetchMockProductList();

      expect(mockData).toBe(MOCK_PRODUCT_LIST_DATA);
    });
  });

  describe('fetchMockProduct', () => {
    beforeEach(() => {
      mockFetch(MOCK_PRODUCT_DATA);
    });

    it('returns mock data', async () => {
      const mockData = await fetchMockProduct();

      expect(mockData).toBe(MOCK_PRODUCT_DATA);
    });
  });
});
