import { render, fireEvent } from '@testing-library/react';

import INPUT_LIST from '../../fixtures/Membership/inputList';

import MembershipForm from './MemberShipForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleBlur.mockClear();
    handleSubmit.mockClear();
  });

  const fieldState = {
    value: '',
    validationMessage: '',
  };

  function renderLoginForm({
    isLogin = true,
    email = fieldState,
    password = fieldState,
    firstName = fieldState,
    lastName = fieldState,
    error,
    isButtonActive = false,
  } = {}) {
    return render(
      <MembershipForm
        isLogin={isLogin}
        fields={{
          email,
          password,
          firstName,
          lastName,
          error,
        }}
        isButtonActive={isButtonActive}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />,
    );
  }

  context('when logging in', () => {
    it('renders the login fields', () => {
      const { queryByPlaceholderText, container } = renderLoginForm({
        error: 'not found',
      });

      expect(queryByPlaceholderText('First')).toBeNull();
      expect(queryByPlaceholderText('Last')).toBeNull();

      expect(container).toHaveTextContent('have an account?');
    });

    it('listens change events for "Log In"', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: true,
      });

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'new email' },
      });

      expect(handleChange).toBeCalledWith({
        name: 'email',
        value: 'new email',
      });
    });

    it('renders "Log In" button', () => {
      const { getByText } = renderLoginForm();

      fireEvent.submit(getByText('Log In'));

      expect(handleSubmit).toBeCalled();
    });

    describe('validationMessage', () => {
      it("doesn't render", () => {
        const { queryByText } = renderLoginForm({
          email: {
            value: 'tester',
            validationMessage: '',
          },
        });

        expect(queryByText('email is a required field.')).toBeNull();
      });
    });
  });

  context('when registering a member', () => {
    it('renders the sign up fields', () => {
      const { queryByPlaceholderText, container } = renderLoginForm({
        isLogin: false,
      });

      expect(queryByPlaceholderText('성(Last Name)')).not.toBeNull();

      expect(queryByPlaceholderText('이름(First Name)')).not.toBeNull();

      expect(container).toHaveTextContent('Passwords must be longer than 7');
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

          expect(handleChange).toBeCalled();
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

          expect(handleChange).not.toBeCalled();
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

          expect(handleChange).toBeCalled();
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

          expect(handleChange).toBeCalled();
        });
      });
    });

    context('when there is validationMessage', () => {
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
            validationMessage: 'email을 확인하세요.',
          },
          password: {
            value: 'Tester@12',
            validationMessage: 'password를 확인하세요.',
          },
        });

        fireEvent.change(getByPlaceholderText('Password'), {
          target: { value: 'Tester@123' },
        });

        expect(handleChange).toBeCalled();
      });
    });

    it('renders "Sign Up" button', () => {
      const { getByText } = renderLoginForm({ isLogin: false });

      fireEvent.submit(getByText('Sign Up'));

      expect(handleSubmit).toBeCalled();
    });

    it('listens blur events', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: false,
      });

      const inputBox = getByPlaceholderText('성(Last Name)');

      inputBox.focus();
      inputBox.blur();

      expect(handleBlur).toBeCalledWith({
        name: 'lastName',
        value: '',
      });
    });

    const inputs = ['lastName', 'firstName', 'email', 'password'];

    inputs.forEach((input) => {
      describe(`${input} invalid check message`, () => {
        context('when it have a value', () => {
          it("doesn't render", () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
            });

            expect(
              queryByText(`${INPUT_LIST[input]} 필수 입력란입니다.`),
            ).toBeNull();
          });
        });

        context("when it doesn't have a value", () => {
          it('renders invalid message', () => {
            const { queryByText } = renderLoginForm({
              isLogin: false,
              [input]: {
                value: '',
                validationMessage: `${INPUT_LIST[input]} 필수 입력란입니다.`,
              },
            });

            expect(
              queryByText(`${INPUT_LIST[input]} 필수 입력란입니다.`),
            ).not.toBeNull();
          });
        });
      });
    });
  });
});
