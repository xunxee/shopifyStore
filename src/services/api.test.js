import {
  postLogin,
} from './api';

import LOGINTOKENS from '../../fixtures/loginTokens';

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
      const data = await postLogin({
        email: '',
        password: '',
      });

      expect(data).toEqual(LOGINTOKENS);
    });
  });
});
