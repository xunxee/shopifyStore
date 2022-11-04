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

    it('[expect] 주문금액이 -이면 BadParameter Exception 을 던진다.', async () => {
      async function callbackAcceptOrder() {
        await acceptOrder({ amount: -1000 });
      }

      await expect(callbackAcceptOrder).rejects
        .toThrowError(new BadParameterException('승인 요청 주문의 금액은 -가 될 수 없습니다'));
    });
  });
});
