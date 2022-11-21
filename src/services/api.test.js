import {
  postLogin,
  postSignUp,
} from './api';

import LOGIN_TOKENS from '../../fixtures/loginTokens';
import POST_LOGIN_DATA from '../../fixtures/postLoginData';
import LOGIN_FAIL_DATA from '../../fixtures/loginFailData';
import SIGNUP_FAIL_DATA from '../../fixtures/signUpFailData';

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
});
