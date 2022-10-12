import reducer, {
  setIsLogin,
} from './slice';

describe('reducer', () => {
  describe('setIsLogin', () => {
    it('changes isLogin', () => {
      const initialState = {
        isLogin: true,
      };

      const state = reducer(
        initialState,
        setIsLogin(),
      );

      expect(state.isLogin).toBe(false);
    });
  });
});
