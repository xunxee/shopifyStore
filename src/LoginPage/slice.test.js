import reducer, {
  setIsModalOpen,
  setIsLogin,
  changeLoginFields,
} from './slice';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      isModalOpen: false,
      isLogin: true,
      loginFields: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setIsModalOpen', () => {
    it('changes isModalOpen', () => {
      const initialState = { isModalOpen: true };

      const { isModalOpen } = reducer(
        initialState,
        setIsModalOpen(),
      );

      expect(isModalOpen).toBe(false);
    });
  });

  describe('setIsLogin', () => {
    it('changes isLogin', () => {
      const initialState = {
        isLogin: true,
      };

      const { isLogin } = reducer(
        initialState,
        setIsLogin(),
      );

      expect(isLogin).toBe(false);
    });
  });

  describe('changeLoginFields', () => {
    context('when email is changed', () => {
      it('changes only email field', () => {
        const initialState = {
          loginFields: {
            email: 'email',
            password: 'password',
            firstName: '',
            lastName: '',
          },
        };

        const { loginFields: { email } } = reducer(
          initialState,
          changeLoginFields({
            name: 'email',
            value: 'new email',
          }),
        );

        expect(email).toBe('new email');
      });
    });

    context('when firtName is changed', () => {
      it('changes only firstName field', () => {
        const initialState = {
          loginFields: {
            email: '',
            password: '',
            firstName: 'firstName',
            lastName: '',
          },
        };

        const { loginFields: { firstName } } = reducer(
          initialState,
          changeLoginFields({
            name: 'firstName',
            value: 'gunhee',
          }),
        );

        expect(firstName).toBe('gunhee');
      });
    });
  });
});
