import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setIsAccountModalOpen,
  setIsLogin,
  changeLoginFields,
  changeLoginErrorMessage,
  clearLoginFields,
  requestLogin,
  setRefreshToken,
  logout,
  setAccountInfo,
  changeInvalidCheckMessage,
  checkSignUpValid,
} from './slice';

import { postLogin } from '../services/api';

import INITIAL_LOGIN_FIELDS from '../../fixtures/initialLoginFields';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      isAccountModalOpen: false,
      isLogin: true,
      loginFields: INITIAL_LOGIN_FIELDS,
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

  describe('setIsAccountModalOpen', () => {
    it('changes isAccountModalOpen', () => {
      const initialState = { isAccountModalOpen: true };

      const { isAccountModalOpen } = reducer(
        initialState,
        setIsAccountModalOpen(),
      );

      expect(isAccountModalOpen).toBe(false);
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
            email: { value: 'email' },
            password: { value: 'password' },
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

        expect(email.value).toBe('new email');
      });
    });

    describe('changeInvalidCheckMessage', () => {
      it('changes email invalidCheckMessage', () => {
        const initialState = {
          loginFields: {
            lastName: {
              value: '',
              invalidCheckMessage: '',
            },
          },
        };

        const { loginFields: { lastName } } = reducer(
          initialState,
          changeInvalidCheckMessage({
            name: 'lastName',
            invalidCheckMessage:
              'Last name is a required field.',
          }),
        );

        expect(lastName.invalidCheckMessage)
          .toBe('Last name is a required field.');
      });
    });

    describe('changeLoginErrorMessage', () => {
      it('changes login error message', () => {
        const initialState = {
          loginFields: {
            error: '',
          },
        };

        const { loginFields: { error } } = reducer(
          initialState,
          changeLoginErrorMessage({
            name: 'error',
            value: 'Check your ID or password',
          }),
        );

        expect(error).toBe('Check your ID or password');
      });
    });

    context('when firtName is changed', () => {
      it('changes only firstName field', () => {
        const initialState = {
          loginFields: {
            email: '',
            password: '',
            firstName: {
              value: 'firstName',
            },
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

        expect(firstName.value).toBe('gunhee');
      });
    });
  });

  describe('clearLoginFields', () => {
    it('clears LoginFields', () => {
      const initialState = {
        loginFields: {
          email: {
            value: 'tester@example.com',
          },
          password: {
            value: 'tester',
          },
          firstName: '',
          lastName: '',
        },
      };

      const { loginFields: { email } } = reducer(
        initialState,
        clearLoginFields(),
      );

      expect(email.value).toBe('');
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

  describe('logout', () => {
    it('clears refresh token', () => {
      const initialState = {
        refreshToken: 'REFRESH_TOKEN',
      };

      const state = reducer(
        initialState,
        logout(),
      );

      expect(state.refreshToken).toBe('');
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

        expect(actions[1]).toEqual(setRefreshToken());
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

      it('dispatchs changeLoginErrorMessage', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[1]).toEqual(changeLoginErrorMessage({
          name: 'error',
          value: 'Check your ID or password',
        }));
      });
    });
  });

  describe('checkSignUpValid', () => {
    describe('lastName', () => {
      context(
        'when the length of lastName value is 0',
        () => {
          beforeEach(() => {
            store = mockStore({
              login: {
                loginFields: {
                  lastName: {
                    value: '',
                    invalidCheckMessage: '',
                  },
                },
              },
            });
          });

          it(
            'changes invalidCheckMessage of lastName',
            () => {
              store.dispatch(checkSignUpValid('lastName'));

              const actinos = store.getActions();

              expect(actinos[0]).toEqual(
                changeInvalidCheckMessage({
                  name: 'lastName',
                  invalidCheckMessage:
                    'lastName is a required field.',
                }),
              );
            },
          );
        },
      );
      context(
        'when the length of lastName value is 1',
        () => {
          beforeEach(() => {
            store = mockStore({
              login: {
                loginFields: {
                  lastName: {
                    value: '정',
                    invalidCheckMessage: '',
                  },
                },
              },
            });
          });

          it(
            "doesn't changes invalidCheckMessage of lastName",
            () => {
              store.dispatch(checkSignUpValid('lastName'));

              const actinos = store.getActions();

              expect(actinos[0]).toEqual(
                changeInvalidCheckMessage({
                  name: 'lastName',
                  invalidCheckMessage:
                    '',
                }),
              );
            },
          );
        },
      );
    });
  });
});
