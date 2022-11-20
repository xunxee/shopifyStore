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

const middleware = [thunk];
const mockStore = configureStore(middleware);

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

    context('when firstName is changed', () => {
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
    const profileInputs = [
      {
        name: 'lastName',
        value: '정',
        invalidCheckMessage:
          'Last Name은 필수 입력란입니다.',
      },
      {
        name: 'firstName',
        value: '건희',
        invalidCheckMessage:
          'First Name은 필수 입력란입니다.',
      },
    ];

    profileInputs.forEach((input) => {
      describe(input.name, () => {
        context(
          `when the length of ${input.name} value is 0`,
          () => {
            beforeEach(() => {
              store = mockStore({
                login: {
                  loginFields: INITIAL_LOGIN_FIELDS,
                },
              });
            });

            it(
              'changes invalidCheckMessage of lastName',
              () => {
                store.dispatch(checkSignUpValid({
                  name: `${input.name}`,
                  value: '',
                }));

                const actions = store.getActions();

                expect(actions[0]).toEqual(
                  changeInvalidCheckMessage({
                    name: `${input.name}`,
                    invalidCheckMessage:
                      `${input.invalidCheckMessage}`,
                  }),
                );
              },
            );
          },
        );
        context(
          `when the length of ${input.name} value is 1`,
          () => {
            beforeEach(() => {
              store = mockStore({
                login: {
                  loginFields: INITIAL_LOGIN_FIELDS,
                },
              });
            });

            it(
              `doesn't changes invalidCheckMessage of ${input.name}`,
              () => {
                store.dispatch(checkSignUpValid({
                  name: `${input.name}`,
                  value: `${input.value}`,
                }));

                const actions = store.getActions();

                expect(actions[0]).toEqual(
                  changeInvalidCheckMessage({
                    name: `${input.name}`,
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

    const loginInputs = [
      {
        name: 'email',
        defaultMessage:
          'Email은 필수 입력란입니다.',
        invalidValue: 'tester',
        inValidMessage:
          'Email은 숫자나 문자로 시작하고 @를 포함해야합니다.',
        validValue: 'tester@example.com',
      },
      {
        name: 'password',
        defaultMessage:
          'Password는 필수 입력란입니다.',
        invalidValue: '123',
        inValidMessage:
          'Password는 숫자, 알파벳 소문자, 알파벳 대문자, 특수문자(!, @, #)을 포함한 8자리 이상의 문자여야합니다.',
        validValue: 'Tester1234@',
      },
    ];

    loginInputs.forEach((input) => {
      describe(`${input.name}`, () => {
        context(`when the length of ${input.name} value is 0`, () => {
          beforeEach(() => {
            store = mockStore({
              login: {
                loginFields: INITIAL_LOGIN_FIELDS,
              },
            });
          });

          it(`changes invalidCheckMessage of ${input.name}`, () => {
            store.dispatch(checkSignUpValid({
              name: `${input.name}`,
              value: '',
            }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${input.name}`,
                invalidCheckMessage:
                  `${input.defaultMessage}`,
              }),
            );
          });
        });

        context('when a invalid value', () => {
          beforeEach(() => {
            store = mockStore({
              login: {
                loginFields: INITIAL_LOGIN_FIELDS,
              },
            });
          });

          it(`changes invalidCheckMessage of ${input.name}`, () => {
            store.dispatch(checkSignUpValid({
              name: `${input.name}`,
              value: `${input.invalidValue}`,
            }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${input.name}`,
                invalidCheckMessage:
                  `${input.inValidMessage}`,
              }),
            );
          });
        });

        context('when a valid value', () => {
          beforeEach(() => {
            store = mockStore({
              login: {
                loginFields: INITIAL_LOGIN_FIELDS,
              },
            });
          });

          it(`changes invalidCheckMessage of ${input.name}`, () => {
            store.dispatch(checkSignUpValid({
              name: `${input.name}`,
              value: `${input.validValue}`,
            }));

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${input.name}`,
                invalidCheckMessage:
                  '',
              }),
            );
          });
        });
      });
    });
  });
});
