import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setIsLoginModalOpen,
  setIsLogin,
  changeLoginFields,
  requestLogin,
  setRefreshToken,
  setAccountInfo,
} from './slice';

import { postLogin } from '../services/api';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      isLoginModalOpen: false,
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
        uid: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setIsLoginModalOpen', () => {
    it('changes isLoginModalOpen', () => {
      const initialState = { isLoginModalOpen: true };

      const { isLoginModalOpen } = reducer(
        initialState,
        setIsLoginModalOpen(),
      );

      expect(isLoginModalOpen).toBe(false);
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

  describe('setAccountInfo', () => {
    it('changes accountInfo', () => {
      const initialState = {
        accountInfo: {
          uid: '',
        },
      };

      const state = reducer(
        initialState,
        setAccountInfo('UID'),
      );

      expect(state.accountInfo.uid).toBe('UID');
    });
  });
});

describe('actions', () => {
  let store;

  describe('requestLogin', () => {
    context('when login is successful', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            loginFields: {
              email: 'tester@example.com',
              password: 'tester',
              error: '',
            },
          },
        });

        postLogin.mockResolvedValue({});
      });

      it('dispatchs setRefreshToken', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRefreshToken());
      });
    });

    context('when login fails', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            loginFields: {
              email: 'tester@example.com',
              password: 'tes',
              error: '',
            },
          },
        });

        postLogin.mockRejectedValue(
          new Error('INVALID_PASSWORD'),
        );
      });

      it('dispatchs changeLoginFields', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[0]).toEqual(changeLoginFields({
          name: 'error',
          value: 'Check your ID or password',
        }));
      });
    });
  });
});
