import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSignUpValid = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSignUpValid.mockClear();
    handleSubmit.mockClear();
  });

  function renderLoginForm({
    isLogin,
    emailValue,
    emailInvalidCheckMessage,
    passwordValue,
    passwordInvalidCheckMessage,
    firstNameValue,
    firstNameInvalidCheckMessage,
    lastNameValue,
    lastNameInvalidCheckMessage,
    error,
  } = {}) {
    return render((
      <LoginForm
        isLogin={isLogin}
        fields={{
          email: {
            value: emailValue,
            invalidCheckMessage: emailInvalidCheckMessage,
          },
          password: {
            value: passwordValue,
            invalidCheckMessage: passwordInvalidCheckMessage,
          },
          firstName: {
            value: firstNameValue,
            invalidCheckMessage: firstNameInvalidCheckMessage,
          },
          lastName: {
            value: lastNameValue,
            invalidCheckMessage: lastNameInvalidCheckMessage,
          },
          error,
        }}
        onChange={handleChange}
        onBlur={handleSignUpValid}
        onSubmit={handleSubmit}
      />
    ));
  }

  context('when logging in', () => {
    it('renders the login fields', () => {
      const {
        getByText,
        queryByPlaceholderText,
        container,
      } = renderLoginForm({
        isLogin: true,
        error: 'not found',
      });

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
      const { queryByText } = renderLoginForm(
        { isLogin: true },
      );

      fireEvent.submit(queryByText('Log In'));

      expect(handleSubmit).toBeCalled();
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

    it('listens change events for "Sign UP"', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: false,
      });

      fireEvent.change(getByPlaceholderText('성(Last Name)'), {
        target: { value: '정' },
      });

      expect(handleChange).toBeCalledWith({
        name: 'lastName', value: '정',
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
        lastNameValue: '',
      });

      const inputBox = queryByPlaceholderText(
        '성(Last Name)',
      );

      inputBox.focus();
      inputBox.blur();

      expect(handleSignUpValid).toBeCalledWith('lastName');
    });

    describe('invalidCheckMessage', () => {
      describe('lastName input', () => {
        context('when it have a value', () => {
          it('invalidCheckMessage is not redered', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              lastNameValue: '정',
              lastNameInvalidCheckMessage: '',
            });

            expect(queryByText(
              'lastName is a required field.',
            )).toBeNull();
          });
        });

        context("when it does't have a value", () => {
          it('renders invalidCheckMessage', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              lastNameValue: '',
              lastNameInvalidCheckMessage:
                'last name is a required field.',
            });

            expect(queryByText(
              'last name is a required field.',
            )).not.toBeNull();
          });
        });
      });

      describe('firstName input', () => {
        context('when it have a value', () => {
          it('invalidCheckMessage is not redered', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              firstNameValue: '건희',
              firstNameInvalidCheckMessage: '',
            });

            expect(queryByText(
              'first name is a required field.',
            )).toBeNull();
          });
        });

        context("when it does't have a value", () => {
          it('renders invalidCheckMessage', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              firstNameValue: '',
              firstNameInvalidCheckMessage:
                'first name is a required field.',
            });

            expect(queryByText(
              'first name is a required field.',
            )).not.toBeNull();
          });
        });
      });

      describe('email input', () => {
        context('when it have a value', () => {
          it('invalidCheckMessage is not redered', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              emailValue: 'tester@example.com',
              emailInvalidCheckMessage: '',
            });

            expect(queryByText(
              'email is a required field.',
            )).toBeNull();
          });
        });

        context("when it does't have a value", () => {
          it('renders invalidCheckMessage', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              emailValue: '',
              emailInvalidCheckMessage:
                'email name is a required field.',
            });

            expect(queryByText(
              'email name is a required field.',
            )).not.toBeNull();
          });
        });
      });

      describe('password input', () => {
        context('when it have a value', () => {
          it('invalidCheckMessage is not redered', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              passwordValue: 'tester',
              passwordInvalidCheckMessage: '',
            });

            expect(queryByText(
              'password is a required field.',
            )).toBeNull();
          });
        });

        context("when it does't have a value", () => {
          it('renders invalidCheckMessage', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              passwordValue: '',
              passwordInvalidCheckMessage:
                'password is a required field.',
            });

            expect(queryByText(
              'password is a required field.',
            )).not.toBeNull();
          });
        });
      });
    });
  });
});
