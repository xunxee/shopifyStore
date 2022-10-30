import {
  postLogin,
} from './api';

import REFRESHTOKEN from '../../fixtures/refreshToken';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('postLogin', () => {
    beforeEach(() => {
      mockFetch(REFRESHTOKEN);
    });

    it('returns refreshToken and localId', async () => {
      const data = await postLogin({
        email: '',
        password: '',
      });

      expect(data).toEqual(REFRESHTOKEN);
    });
  });
});
