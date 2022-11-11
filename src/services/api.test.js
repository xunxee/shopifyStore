import {
  postLogin,
  postSignUp,
} from './api';

import LOGINTOKENS from '../../fixtures/loginTokens';
import LOGIN_FIELDS from '../../fixtures/loginFields';
import LOGIN_FAILDATA from '../../fixtures/loginFailData';
import SIGNUP_FAILDATA from '../../fixtures/signUpFailData';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('postLogin', () => {
    context('when login successful', () => {
      beforeEach(() => {
        mockFetch(LOGINTOKENS);
      });

      it('returns loginTokens', async () => {
        const data = await postLogin(LOGIN_FIELDS);

        expect(data).toEqual(LOGINTOKENS);
      });
    });

    context('when login fails', () => {
      beforeEach(() => {
        mockFetch(LOGIN_FAILDATA);
      });

      it('throw an error', async () => {
        await expect(async () => {
          await postLogin(LOGIN_FIELDS);
        }).rejects.toThrowError(new Error('INVALID_PASSWORD'));
      });
    });
  });

  describe('postSignUp', () => {
    context('when "sign up" successful', () => {
      beforeEach(() => {
        mockFetch(LOGINTOKENS);
      });

      it('returns loginTokens', async () => {
        const data = await postSignUp(LOGIN_FIELDS);

        expect(data).toEqual(LOGINTOKENS);
      });
    });

    context('when "sign up" fails', () => {
      beforeEach(() => {
        mockFetch(SIGNUP_FAILDATA);
      });

      it('throw an error', async () => {
        await expect(async () => {
          await postSignUp(SIGNUP_FAILDATA);
        }).rejects.toThrowError(new Error('ID_ALREADY_EXISTS'));
      });
    });
  });
});
