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
        onHandleInvalidCheckMessage={handleInvalidCheckMessage}
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

    it('changes the value of the disabled to false', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: false,
        firstName: {
          value: '정',
        },
        lastName: {
          value: '건희',
        },
        email: {
          value: 'tester@example.com',
        },
        password: {
          value: 'Tester@12345',
        },
      });

      fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'TesterT@12345' },
      });

      expect(handleInvalidCheckMessage).toBeCalled();
    });

    context('when password validity does not match', () => {
      it('renders invalid message', () => {
        const { container } = renderLoginForm({
          isLogin: false,
          firstName: {
            value: '정',
          },
          lastName: {
            value: '건희',
          },
          email: {
            value: 'testerexample.com',
            invalidCheckMessage: 'Email은 숫자나 문자로 시작하고 @를 포함해야합니다.',
          },
          password: {
            value: 'test1234@@',
            invalidCheckMessage: 'Password는 숫자, 알파벳 소문자, 알파벳 대문자, 특수문자(!, @, #)을 포함한 8자리 이상의 문자여야합니다.',
          },
        });

        expect(container).toHaveTextContent(
          'Password는 숫자, 알파벳 소문자, 알파벳 대문자, 특수문자(!, @, #)을 포함한 8자리 이상의 문자여야합니다.',
        );
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
              `${INPUT_LIST[input.name]} 필수 입력란입니다.`,
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
                  `${INPUT_LIST[input.name]} 필수 입력란입니다.`,
              },
            });

            expect(queryByText(
              `${INPUT_LIST[input.name]} 필수 입력란입니다.`,
            )).not.toBeNull();
          });
        });
      });
    });
  });
});
