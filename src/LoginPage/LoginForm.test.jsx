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
    passwordValue,
    firstNameValue,
    lastNameValue,
    error,
  } = {}) {
    return render((
      <LoginForm
        isLogin={isLogin}
        fields={{
          email: { value: emailValue },
          password: { value: passwordValue },
          firstName: { value: firstNameValue },
          lastName: { value: lastNameValue },
          error,
        }}
        onChange={handleChange}
        onBlur={handleSignUpValid}
        onSubmit={handleSubmit}
      />
    ));
  }

  context('with logged in', () => {
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
        name: 'email', value: 'new email',
      });
    });

    it('renders "Log In" button', () => {
      const { queryByText } = renderLoginForm({ isLogin: true });

      fireEvent.submit(queryByText('Log In'));

      expect(handleSubmit).toBeCalled();
    });
  });

  context('without logged in', () => {
    it('renders the sign up fields', () => {
      const {
        queryByPlaceholderText,
        container,
      } = renderLoginForm({ isLogin: false });

      expect(queryByPlaceholderText('성(Last Name)')).not.toBeNull();
      expect(queryByPlaceholderText('이름(First Name)')).not.toBeNull();

      expect(container).toHaveTextContent('Passwords must be longer than 7');
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

    it('listens blur events', () => {
      const { queryByPlaceholderText } = renderLoginForm({
        isLogin: false,
      });

      const inputBox = queryByPlaceholderText('성(Last Name)');

      inputBox.focus();
      inputBox.blur();

      expect(handleSignUpValid).toBeCalled();
    });

    it('renders "Sign Up" button', () => {
      const { queryByText } = renderLoginForm({ isLogin: false });

      fireEvent.submit(queryByText('Sign Up'));

      expect(handleSubmit).toBeCalled();
    });
  });
});
