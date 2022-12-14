import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

import INPUT_LIST from '../../fixtures/inputList';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSignUpValid = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSignUpValid.mockClear();
    handleSubmit.mockClear();
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

      expect(queryByPlaceholderText('???(Last Name)'))
        .not.toBeNull();
      expect(queryByPlaceholderText('??????(First Name)'))
        .not.toBeNull();

      expect(container)
        .toHaveTextContent('Passwords must be longer than 7');
    });

    it('listens change events for "Sign UP"', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: false,
      });

      fireEvent.change(getByPlaceholderText('???(Last Name)'), {
        target: { value: '???' },
      });

      expect(handleChange).toBeCalledWith({
        name: 'lastName', value: '???',
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
        '???(Last Name)',
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
        name: 'lastName',
      },
      {
        invalidCheckMessage: 'firstNameInvalidCheckMessage',
        name: 'firstName',
      },
      {
        invalidCheckMessage: 'emailInvalidCheckMessage',
        name: 'email',
      },
      {
        invalidCheckMessage: 'passwordInvalidCheckMessage',
        name: 'password',
      },
    ];

    inputs.forEach((input) => {
      describe(input.invalidCheckMessage, () => {
        context('when it have a value', () => {
          it("doesn't render", () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
            });

            expect(queryByText(
              `${INPUT_LIST[input.name]} ?????? ??????????????????.`,
            )).toBeNull();
          });
        });

        context("when it doesn't have a value", () => {
          it('renders invalid message', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              [input.name]: {
                value: '',
                invalidCheckMessage:
                  `${INPUT_LIST[input.name]} ?????? ??????????????????.`,
              },
            });

            expect(queryByText(
              `${INPUT_LIST[input.name]} ?????? ??????????????????.`,
            )).not.toBeNull();
          });
        });
      });
    });
  });
});
