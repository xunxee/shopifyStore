import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import FIELDS_STATE from '../../fixtures/Membership/fieldState';
import VALID_FIELDS from '../../fixtures/Membership/validFields';
import INITIAL_LOGIN_FIELDS from '../../fixtures/Membership/initialLoginFields';
import { postLogin, postSignUp } from '../services/api';

import reducer, {
  setIsAccountModalOpen,
  setIsLogin,
  changeAccountFields,
  changeAccountErrorMessage,
  clearAccountFields,
  clearInvalidCheckMessage,
  requestLogin,
  setRefreshToken,
  logout,
  changeInvalidCheckMessage,
  checkInputValue,
  requestSignUp,
  checkMemberInfo,
  setButtonActive,
} from './slice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      isAccountModalOpen: false,
      isLogin: true,
      isButtonActive: false,
      accountFields: INITIAL_LOGIN_FIELDS,
      refreshToken: '',
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

      const { isLogin } = reducer(initialState, setIsLogin());

      expect(isLogin).toBe(false);
    });
  });

  describe('changeAccountFields', () => {
    context('when email is changed', () => {
      it('changes only email field', () => {
        const initialState = {
          accountFields: {
            email: { value: 'email' },
            password: { value: 'password' },
            firstName: '',
            lastName: '',
          },
        };

        const {
          accountFields: { email },
        } = reducer(
          initialState,
          changeAccountFields({
            name: 'email',
            value: 'new email',
          }),
        );

        expect(email.value).toBe('new email');
      });
    });

    describe('changeInvalidCheckMessage', () => {
      it('changes email validationMessage', () => {
        const initialState = {
          accountFields: {
            lastName: {
              value: '',
              validationMessage: '',
            },
          },
        };

        const {
          accountFields: { lastName },
        } = reducer(
          initialState,
          changeInvalidCheckMessage({
            name: 'lastName',
            validationMessage: 'Last name is a required field.',
          }),
        );

        expect(lastName.validationMessage).toBe(
          'Last name is a required field.',
        );
      });
    });

    describe('changeAccountErrorMessage', () => {
      it('changes login error message', () => {
        const initialState = {
          accountFields: {
            error: '',
          },
        };

        const {
          accountFields: { error },
        } = reducer(
          initialState,
          changeAccountErrorMessage({
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
          accountFields: {
            email: '',
            password: '',
            firstName: {
              value: 'firstName',
            },
            lastName: '',
          },
        };

        const {
          accountFields: { firstName },
        } = reducer(
          initialState,
          changeAccountFields({
            name: 'firstName',
            value: 'gunhee',
          }),
        );

        expect(firstName.value).toBe('gunhee');
      });
    });
  });

  describe('clearAccountFields', () => {
    it('clears LoginFields', () => {
      const initialState = {
        accountFields: {
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

      const {
        accountFields: { email },
      } = reducer(initialState, clearAccountFields());

      expect(email.value).toBe('');
    });
  });

  describe('clearInvalidCheckMessage', () => {
    it('clear email invalid check message', () => {
      const initialState = {
        accountFields: {
          email: {
            validationMessage: 'email을 확인하세요',
          },
        },
      };

      const {
        accountFields: { email },
      } = reducer(initialState, clearInvalidCheckMessage('email'));

      expect(email.validationMessage).toBe('');
    });

    it('clear password invalid check message', () => {
      const initialState = {
        accountFields: {
          password: {
            validationMessage: 'password를 확인하세요',
          },
        },
      };

      const {
        accountFields: { password },
      } = reducer(initialState, clearInvalidCheckMessage('password'));

      expect(password.validationMessage).toBe('');
    });
  });

  describe('setRefreshToken', () => {
    it('changes refresh token', () => {
      const initialState = {
        refreshToken: '',
      };

      const state = reducer(initialState, setRefreshToken('TOKEN'));

      expect(state.refreshToken).toBe('TOKEN');
    });
  });

  describe('logout', () => {
    it('clears refresh token', () => {
      const initialState = {
        refreshToken: 'REFRESH_TOKEN',
      };

      const state = reducer(initialState, logout());

      expect(state.refreshToken).toBe('');
    });
  });

  describe('setButtonActive', () => {
    it('changes isButtonActive', () => {
      const initialState = {
        isButtonActive: false,
      };

      const state = reducer(initialState, setButtonActive(true));

      expect(state.isButtonActive).toBe(true);
    });
  });
});

describe('actions', () => {
  let store;

  function makeMockStore({
    isLogin = false,
    email = FIELDS_STATE,
    password = FIELDS_STATE,
    firstName = FIELDS_STATE,
    lastName = FIELDS_STATE,
    isButtonActive = false,
  } = {}) {
    return mockStore({
      membership: {
        isLogin,
        accountFields: {
          email: {
            value: email.value,
            validationMessage: email.validationMessage,
          },
          password: {
            value: password.value,
            validationMessage: password.validationMessage,
          },
          firstName: {
            value: firstName.value,
            validationMessage: firstName.validationMessage,
          },
          lastName: {
            value: lastName.value,
            validationMessage: lastName.validationMessage,
          },
        },
        isButtonActive,
      },
    });
  }

  describe('requestLogin', () => {
    context('when login successful', () => {
      beforeEach(() => {
        store = makeMockStore();

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
        store = makeMockStore();

        postLogin.mockRejectedValue(new Error('INVALID_PASSWORD'));
      });

      it('dispatch changeAccountErrorMessage', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[1]).toEqual(
          changeAccountErrorMessage({
            name: 'error',
            value: 'Check your ID or password',
          }),
        );
      });
    });
  });

  describe('requestSignUp', () => {
    context('when sign up successful', () => {
      beforeEach(() => {
        store = makeMockStore();

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
        store = makeMockStore();

        postSignUp.mockRejectedValue(new Error('EMAIL_EXISTS'));
      });

      it('dispatch changeAccountErrorMessage', async () => {
        await store.dispatch(requestSignUp());

        const actions = store.getActions();

        expect(actions[1]).toEqual(
          changeAccountErrorMessage({
            name: 'error',
            value: '이미 존재하는 아이디입니다.',
          }),
        );
      });
    });
  });

  describe('checkInputValue', () => {
    const profileInputs = [
      {
        name: 'lastName',
        value: '정',
        validationMessage: 'Last Name은 필수 입력란입니다.',
      },
      {
        name: 'firstName',
        value: '건희',
        validationMessage: 'First Name은 필수 입력란입니다.',
      },
    ];

    profileInputs.forEach(({ name, value, validationMessage }) => {
      describe(name, () => {
        context(`when the length of ${name} value is 0`, () => {
          beforeEach(() => {
            store = makeMockStore();
          });

          it(`changes validationMessage of ${name}`, () => {
            store.dispatch(
              checkInputValue({
                name: `${name}`,
                value: '',
              }),
            );

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${name}`,
                validationMessage: `${validationMessage}`,
              }),
            );
          });
        });
        context(`when the length of ${name} value is 1`, () => {
          beforeEach(() => {
            store = makeMockStore();
          });

          it(`doesn't changes validationMessage of ${name}`, () => {
            store.dispatch(
              checkInputValue({
                name: `${name}`,
                value: `${value}`,
              }),
            );

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${name}`,
                validationMessage: '',
              }),
            );
          });
        });
      });
    });

    const loginInputs = [
      {
        name: 'email',
        defaultMessage: 'Email은 필수 입력란입니다.',
        invalidValue: 'tester',
        inValidMessage: VALID_FIELDS.email.invalidMessage,
        validValue: 'tester@example.com',
      },
      {
        name: 'password',
        defaultMessage: 'Password는 필수 입력란입니다.',
        invalidValue: '123',
        inValidMessage: VALID_FIELDS.password.invalidMessage,
        validValue: 'Tester1234@',
      },
    ];

    loginInputs.forEach((input) => {
      describe(`${input.name}`, () => {
        context(`when the length of ${input.name} value is 0`, () => {
          beforeEach(() => {
            store = makeMockStore();

            postSignUp.mockRejectedValue(new Error('EMAIL_EXISTS'));
          });

          it(`changes validationMessage of ${input.name}`, () => {
            store.dispatch(
              checkInputValue({
                name: `${input.name}`,
                value: '',
              }),
            );

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${input.name}`,
                validationMessage: `${input.defaultMessage}`,
              }),
            );
          });
        });

        context('when a invalid value', () => {
          beforeEach(() => {
            store = makeMockStore();
          });

          it(`changes validationMessage of ${input.name}`, () => {
            store.dispatch(
              checkInputValue({
                name: `${input.name}`,
                value: `${input.invalidValue}`,
              }),
            );

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${input.name}`,
                validationMessage: `${input.inValidMessage}`,
              }),
            );
          });
        });

        context('when a valid value', () => {
          beforeEach(() => {
            store = makeMockStore();
          });

          it(`changes validationMessage of ${input.name}`, () => {
            store.dispatch(
              checkInputValue({
                name: `${input.name}`,
                value: `${input.validValue}`,
              }),
            );

            const actions = store.getActions();

            expect(actions[0]).toEqual(
              changeInvalidCheckMessage({
                name: `${input.name}`,
                validationMessage: '',
              }),
            );
          });
        });
      });
    });
  });

  describe('checkMemberInfo', () => {
    context('when all values for login are entered correctly', () => {
      beforeEach(() => {
        store = makeMockStore({
          isLogin: true,
          email: { value: 'tester@example.com' },
          password: { value: 'Tester@123' },
        });
      });

      it('conveys true to setButtonActive', () => {
        store.dispatch(
          checkMemberInfo({
            name: 'email',
            value: 'tester@example.com',
          }),
        );

        const actions = store.getActions();

        expect(actions[0]).toEqual(setButtonActive(true));
      });
    });

    context('when there is no Sign Up email', () => {
      beforeEach(() => {
        store = makeMockStore();
      });

      it('terminates the function', () => {
        store.dispatch(
          checkMemberInfo({
            name: 'email',
            value: '',
          }),
        );

        const actions = store.getActions();

        expect(actions).toStrictEqual([]);
      });
    });

    context('when all values for sign up are entered correctly', () => {
      beforeEach(() => {
        store = makeMockStore({
          email: { value: 'tester@example.com' },
          password: { value: 'Tester@123' },
          firstName: { value: '건희' },
          lastName: { value: '정' },
        });
      });

      it('conveys true to setButtonActive', () => {
        store.dispatch(
          checkMemberInfo({
            name: 'firstName',
            value: '정',
          }),
        );

        const actions = store.getActions();

        expect(actions[0]).toEqual(setButtonActive(true));
      });
    });

    context('when enter password for sign up', () => {
      beforeEach(() => {
        store = makeMockStore({
          email: { value: 'tester@example.com' },
          password: {
            value: 'Tester@123',
            validationMessage: '비밀번호를 확인하세요',
          },
          firstName: { value: '건희' },
          lastName: { value: '정' },
        });
      });

      it('clears validationMessage', async () => {
        await store.dispatch(
          checkMemberInfo({
            name: 'password',
            value: 'Tester@123',
          }),
        );

        const actions = store.getActions();

        expect(actions[0]).toEqual(clearInvalidCheckMessage('password'));
      });
    });

    context('when enter an invalid password', () => {
      beforeEach(() => {
        store = makeMockStore({
          email: { value: 'tester@example.com' },
          password: {
            value: 'Tester@',
            validationMessage: '비밀번호를 확인하세요',
          },
          lastName: { value: '정' },
          isButtonActive: true,
        });
      });

      it('conveys false to setButtonActive', async () => {
        await store.dispatch(
          checkMemberInfo({
            name: 'password',
            value: 'Tester@',
          }),
        );

        const actions = store.getActions();

        expect(actions[0]).toEqual(setButtonActive(false));
      });
    });

    context('when email have validationMessage', () => {
      beforeEach(() => {
        store = makeMockStore({
          email: {
            value: 'tester',
            validationMessage: '이메일을 확인하세요',
          },
          password: {
            value: 'Tester@123',
          },
          firstName: { value: '건희' },
          lastName: { value: '정' },
        });
      });

      it('terminates the function', async () => {
        await store.dispatch(
          checkMemberInfo({
            name: 'password',
            value: 'Tester@',
          }),
        );

        const actions = store.getActions();

        expect(actions).toStrictEqual([]);
      });
    });
  });
});
