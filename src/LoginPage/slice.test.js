import reducer, {
  setIsLogin,
  changeLoginFields,
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

  describe('changeLoginFields', () => {
    context('when email is changed', () => {
      it('changes only email field', () => {
        const initialState = {
          loginFields: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
          },
        };

        const state = reducer(
          initialState,
          changeLoginFields({
            name: 'email',
            value: 'new email',
          }),
        );

        expect(state.loginFields.email).toBe('new email');
      });
    });
  });
});
