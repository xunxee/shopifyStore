import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

import INPUT_LIST from '../../fixtures/inputList';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSignUpValid = jest.fn();
  const handleSubmit = jest.fn();
  const handleInvalidCheckMessage = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSignUpValid.mockClear();
    handleSubmit.mockClear();
    handleInvalidCheckMessage.mockClear();
  });

  const fieldState = {
    value: '',
    invalidCheckMessage: '',
  };

  function renderLoginForm({
    isLogin = true,
    email = fieldState,
    password = fieldState,
    firstName = fieldState,
    lastName = fieldState,
    error,
  } = {}) {
    return render((
      <LoginForm
        isLogin={isLogin}
        fields={{
          email,
          password,
          firstName,
          lastName,
          error,
        }}
        onChange={handleChange}
        onBlur={handleSignUpValid}
        onSubmit={handleSubmit}
        handleInvalidCheckMessage={handleInvalidCheckMessage}
      />
    ));
  }

  context('when logging in', () => {
    it('renders the login fields', () => {
      const {
        getByText,
        queryByPlaceholderText,
        container,
      } = renderLoginForm({ error: 'not found' });

      expect(getByText('not found')).not.toBeNull();
      expect(queryByPlaceholderText('First')).toBeNull();
      expect(queryByPlaceholderText('Last')).toBeNull();

      expect(container)
        .toHaveTextContent('have an account?');
    });

    it('listens change events for "Log In"', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: true,
      });

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'new email' },
      });

      expect(handleChange).toBeCalledWith({
        name: 'email', value: 'new email',
      });
    });

    it('renders "Log In" button', () => {
      const { queryByText } = renderLoginForm();

      fireEvent.submit(queryByText('Log In'));

      expect(handleSubmit).toBeCalled();
    });

    describe('invalidCheckMessage', () => {
      it("doesn't render", () => {
        const { queryByText } = renderLoginForm({
          email: {
            value: 'tester',
            invalidCheckMessage: '',
          },
        });

        expect(queryByText(
          'email is a required field.',
        )).toBeNull();
      });
    });
  });

  context('when registering a member', () => {
    it('renders the sign up fields', () => {
      const {
        queryByPlaceholderText,
        container,
      } = renderLoginForm({ isLogin: false });

      expect(queryByPlaceholderText('성(Last Name)'))
        .not.toBeNull();
      expect(queryByPlaceholderText('이름(First Name)'))
        .not.toBeNull();

      expect(container)
        .toHaveTextContent('Passwords must be longer than 7');
    });

    describe('handleChange', () => {
      context('when the email passes validation', () => {
        it('execute the handleInvalidCheckMessage function', () => {
          const { getByPlaceholderText } = renderLoginForm({
            isLogin: false,
            firstName: {
              value: '정',
            },
            lastName: {
              value: '건희',
            },
            email: {
              value: 'tester@example.co',
            },
            password: {
              value: 'Tester@123',
            },
          });

          fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'tester@example.com' },
          });

          expect(handleInvalidCheckMessage).toBeCalled();
        });
      });

      context('when the email fails validation', () => {
        it("doesn't execute the handleInvalidCheckMessage function", () => {
          const { getByPlaceholderText } = renderLoginForm({
            isLogin: false,
            firstName: {
              value: '정',
            },
            lastName: {
              value: '건희',
            },
            email: {
              value: 'tester',
            },
            password: {
              value: 'Tester@123',
            },
          });

          fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'tester' },
          });

          expect(handleInvalidCheckMessage).not.toBeCalled();
        });
      });

      context('when the password passes validation', () => {
        it('execute the handleInvalidCheckMessage function', () => {
          const { getByPlaceholderText } = renderLoginForm({
            isLogin: false,
            firstName: {
              value: '정',
            },
            lastName: {
              value: '건희',
            },
            password: {
              value: 'Tester@12',
            },
          });

          fireEvent.change(getByPlaceholderText('Password'), {
            target: { value: 'Tester@123' },
          });

          expect(handleInvalidCheckMessage).toBeCalled();
        });
      });

      context('when the password fails validation', () => {
        it("doesn't execute the handleInvalidCheckMessage function", () => {
          const { getByPlaceholderText } = renderLoginForm({
            isLogin: false,
            firstName: {
              value: '정',
            },
            lastName: {
              value: '건희',
            },
            password: {
              value: 'tester@12',
            },
          });

          fireEvent.change(getByPlaceholderText('Email'), {
            target: { value: 'tester@123' },
          });

          expect(handleInvalidCheckMessage).not.toBeCalled();
        });
      });
    });

    context('when there is invalidCheckMessage', () => {
      it('checkDisabled returns false', () => {
        const { getByPlaceholderText } = renderLoginForm({
          isLogin: false,
          firstName: {
            value: '정',
          },
          lastName: {
            value: '건희',
          },
          email: {
            value: 'tester',
            invalidCheckMessage: 'email을 확인하세요.',
          },
          password: {
            value: 'Tester@12',
            invalidCheckMessage: 'password를 확인하세요.',
          },
        });

        fireEvent.change(getByPlaceholderText('Password'), {
          target: { vale: 'Tester@123' },
        });

        expect(handleInvalidCheckMessage).not.toBeCalled();
      });
    });

    it('renders "Sign Up" button', () => {
      const { queryByText } = renderLoginForm(
        { isLogin: false },
      );

      fireEvent.submit(queryByText('Sign Up'));

      expect(handleSubmit).toBeCalled();
    });

    it('listens blur events', () => {
      const { queryByPlaceholderText } = renderLoginForm({
        isLogin: false,
      });

      const inputBox = queryByPlaceholderText(
        '성(Last Name)',
      );

      inputBox.focus();
      inputBox.blur();

      expect(handleSignUpValid).toBeCalledWith({
        name: 'lastName',
      });
    });

    const inputs = [
      'lastName',
      'firstName',
      'email',
      'password',
    ];

    inputs.forEach((input) => {
      describe(`${input} invalid check message`, () => {
        context('when it have a value', () => {
          it("doesn't render", () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
            });

            expect(queryByText(
              `${INPUT_LIST[input]} 필수 입력란입니다.`,
            )).toBeNull();
          });
        });

        context("when it doesn't have a value", () => {
          it('renders invalid message', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              [input]: {
                value: '',
                invalidCheckMessage:
                  `${INPUT_LIST[input]} 필수 입력란입니다.`,
              },
            });

            expect(queryByText(
              `${INPUT_LIST[input]} 필수 입력란입니다.`,
            )).not.toBeNull();
          });
        });
      });
    });
  });
});
