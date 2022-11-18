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

    describe('invalidCheckMessage', () => {
      it("doesn't render", () => {
        const { queryByText } = renderLoginForm({
          isLogin: true,
          emailValue: 'tester',
          emailInvalidCheckMessage: '',
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

      expect(handleSignUpValid).toBeCalledWith({
        name: 'lastName',
      });
    });

    const inputs = [
      {
        invalidCheckMessage: 'lastNameInvalidCheckMessage',
        inputName: 'last name',
      },
      {
        invalidCheckMessage: 'firstNameInvalidCheckMessage',
        inputName: 'first name',
      },
      {
        invalidCheckMessage: 'emailInvalidCheckMessage',
        inputName: 'email',
      },
      {
        invalidCheckMessage: 'passwordInvalidCheckMessage',
        inputName: 'password',
      },
    ];

    inputs.forEach((input) => {
      describe(input.invalidCheckMessage, () => {
        context('when it have a value', () => {
          it("doesn't render", () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              [input.invalidCheckMessage]: '',
            });

            expect(queryByText(
              `${inputs.inputName} is a required field.`,
            )).toBeNull();
          });
        });

        context("when it doesn't have a value", () => {
          it('renders invalid message', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              [input.invalidCheckMessage]:
                `${inputs.inputName} is a required field.`,
            });

            expect(queryByText(
              `${inputs.inputName} is a required field.`,
            )).not.toBeNull();
          });
        });
      });
    });
  });
});
