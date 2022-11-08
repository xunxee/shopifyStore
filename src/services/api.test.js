import {
  postLogin,
  TODO,
} from './api';

import LOGINTOKENS from '../../fixtures/loginTokens';
import LOGIN_FIELDS from '../../fixtures/loginFields';
import LOGIN_FAILDATA from '../../fixtures/loginFailData';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('postLogin', () => {
    beforeEach(() => {
      mockFetch(LOGINTOKENS);
    });

    it('returns loginTokens', async () => {
      const data = await postLogin(LOGIN_FIELDS);

      expect(data).toEqual(LOGINTOKENS);
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

  describe('TODO', () => {
    it('returnns TODO', () => {
      const value = TODO();

      expect(value).toBe('TODO');
    });
  });
});
