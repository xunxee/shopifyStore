import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setIsAccountModalOpen,
  setIsLogin,
  changeLoginFields,
  changeLoginErrorMessage,
  clearLoginFields,
  clearInvalidCheckMessage,
  requestLogin,
  setRefreshToken,
  logout,
  setAccountInfo,
  changeInvalidCheckMessage,
  checkSignUpValid,
  requestSignUp,
  checkInvalidMessageClear,
  setButtonActive,
} from './slice';

import { postLogin, postSignUp } from '../services/api';

import INITIAL_LOGIN_FIELDS from '../../fixtures/initialLoginFields';
import VALID_FIELDS from '../../fixtures/validFields';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      isAccountModalOpen: false,
      isLogin: true,
      isButtonActive: false,
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

  describe('clearInvalidCheckMessage', () => {
    it('clear email invalid check message', () => {
      const initialState = {
        loginFields: {
          email: {
            invalidCheckMessage: 'email을 확인하세요',
          },
        },
      };

      const { loginFields: { email } } = reducer(
        initialState,
        clearInvalidCheckMessage('email'),
      );

      expect(email.invalidCheckMessage).toBe('');
    });

    it('clear password invalid check message', () => {
      const initialState = {
        loginFields: {
          password: {
            invalidCheckMessage: 'password를 확인하세요',
          },
        },
      };

      const { loginFields: { password } } = reducer(
        initialState,
        clearInvalidCheckMessage('password'),
      );

      expect(password.invalidCheckMessage).toBe('');
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

  describe('setButtonActive', () => {
    it('changes isButtonActive', () => {
      const initialState = {
        isButtonActive: false,
      };

      const state = reducer(
        initialState,
        setButtonActive(true),
      );

      expect(state.isButtonActive).toBe(true);
    });
  });
});

describe('actions', () => {
  let store;

  describe('requestLogin', () => {
    context('when login successful', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            loginFields: INITIAL_LOGIN_FIELDS,
          },
        });

        postLogin.mockResolvedValue({});
      });

      it('dispatch setRefreshToken', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[1]).toEqual(setRefreshToken());
      });
    });

    context('when login fails', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            loginFields: INITIAL_LOGIN_FIELDS,
          },
        });

        postLogin.mockRejectedValue(
          new Error('INVALID_PASSWORD'),
        );
      });

      it('dispatch changeLoginErrorMessage', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[1]).toEqual(changeLoginErrorMessage({
          name: 'error',
          value: 'Check your ID or password',
        }));
      });
    });
  });

  describe('requestSignUp', () => {
    context('when sign up successful', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            loginFields: INITIAL_LOGIN_FIELDS,
          },
        });

        postSignUp.mockResolvedValue({});
      });

      it('dispatch setRefreshToken', async () => {
        await store.dispatch(requestSignUp());

        const actions = store.getActions();

        expect(actions[1]).toEqual(setRefreshToken());
      });
    });

    context('when sign up fails', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            loginFields: INITIAL_LOGIN_FIELDS,
          },
        });

        postSignUp.mockRejectedValue(
          new Error('EMAIL_EXISTS'),
        );
      });

      it('dispatch changeLoginErrorMessage', async () => {
        await store.dispatch(requestSignUp());

        const actions = store.getActions();

        expect(actions[1]).toEqual(changeLoginErrorMessage({
          name: 'error',
          value: '이미 존재하는 아이디입니다.',
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

    profileInputs.forEach(({
      name, value, invalidCheckMessage,
    }) => {
      describe(name, () => {
        context(
          `when the length of ${name} value is 0`,
          () => {
            beforeEach(() => {
              store = mockStore({
                login: {
                  loginFields: INITIAL_LOGIN_FIELDS,
                },
              });
            });

            it(
              `changes invalidCheckMessage of ${name}`,
              () => {
                store.dispatch(checkSignUpValid({
                  name: `${name}`,
                  value: '',
                }));

                const actions = store.getActions();

                expect(actions[0]).toEqual(
                  changeInvalidCheckMessage({
                    name: `${name}`,
                    invalidCheckMessage:
                      `${invalidCheckMessage}`,
                  }),
                );
              },
            );
          },
        );
        context(
          `when the length of ${name} value is 1`,
          () => {
            beforeEach(() => {
              store = mockStore({
                login: {
                  loginFields: INITIAL_LOGIN_FIELDS,
                },
              });
            });

            it(
              `doesn't changes invalidCheckMessage of ${name}`,
              () => {
                store.dispatch(checkSignUpValid({
                  name: `${name}`,
                  value: `${value}`,
                }));

                const actions = store.getActions();

                expect(actions[0]).toEqual(
                  changeInvalidCheckMessage({
                    name: `${name}`,
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
          VALID_FIELDS.email.invalidMessage,
        validValue: 'tester@example.com',
      },
      {
        name: 'password',
        defaultMessage:
          'Password는 필수 입력란입니다.',
        invalidValue: '123',
        inValidMessage:
          VALID_FIELDS.password.invalidMessage,
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

            postSignUp.mockRejectedValue(
              new Error('EMAIL_EXISTS'),
            );
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

  describe('checkInvalidMessageClear', () => {
    context('when all values for login are entered correctly', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            isLogin: true,
            loginFields: {
              email: {
                value: 'tester@example.com',
              },
              password: {
                value: 'Tester@123',
              },
            },
            isButtonActive: false,
          },
        });
      });

      it('conveys false to setButtonActive', async () => {
        await store.dispatch(checkInvalidMessageClear({
          name: 'email',
          value: 'tester@example.com',
        }));

        const actions = store.getActions();

        expect(actions[2]).toEqual(
          clearInvalidCheckMessage('email'),
        );
      });
    });

    context('when there is no Sign Up email', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            isLogin: false,
            loginFields: INITIAL_LOGIN_FIELDS,
            isButtonActive: false,
          },
        });
      });

      it('conveys false to setButtonActive', async () => {
        await store.dispatch(checkInvalidMessageClear({
          name: 'email',
          value: '',
        }));

        const actions = store.getActions();

        expect(actions[1]).toEqual(
          setButtonActive(false),
        );
      });
    });

    context('when all values for sign up are entered correctly', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            isLogin: false,
            loginFields: {
              email: { value: 'tester@example.com' },
              password: { value: 'Tester@123' },
              firstName: { value: '건희' },
              lastName: { value: '정' },
            },
            isButtonActive: false,
          },
        });
      });

      it('conveys true to setButtonActive', async () => {
        await store.dispatch(checkInvalidMessageClear({
          name: 'firstName',
          value: '정',
        }));

        const actions = store.getActions();

        expect(actions[1]).toEqual(
          setButtonActive(true),
        );
      });
    });

    context('when enter password for sign up', () => {
      beforeEach(() => {
        store = mockStore({
          login: {
            isLogin: false,
            loginFields: {
              email: { value: 'tester@example.com' },
              password: { value: 'Tester@123' },
              firstName: { value: '건희' },
              lastName: { value: '정' },
            },
            isButtonActive: false,
          },
        });
      });

      it('clears invalidCheckMessage', async () => {
        await store.dispatch(checkInvalidMessageClear({
          name: 'password',
          value: 'Tester@123',
        }));

        const actions = store.getActions();

        expect(actions[2]).toEqual(
          clearInvalidCheckMessage('password'),
        );
      });
    });
  });
});
