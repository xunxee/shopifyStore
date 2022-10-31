import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setIsModalOpen,
  setIsLogin,
  changeLoginFields,
  requestLogin,
  setRefreshToken,
} from './slice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

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
        error: '',
      },
      refreshToken: '',
      accountInfo: {
        localId: '',
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

  describe('setRefreshToken', () => {
    it('changes refresh token', () => {
      const initialState = {
        refreshToken: '',
      };

      const state = reducer(
        initialState,
        setRefreshToken('TOKEN'),
      );

      expect(state.refreshToken).toBe('TOKEN');
    });
  });
});

describe('actions', () => {
  let store;

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        login: {
          loginFields: { email: '', password: '' },
        },
      });
    });

    it('dispatchs setRefreshToken', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRefreshToken());
    });
  });
});
