import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  function renderLoginForm({
    isLogin, email, password, firstName, lastName,
  } = {}) {
    return render((
      <LoginForm
        isLogin={isLogin}
        fields={{
          email, password, firstName, lastName,
        }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    ));
  }

  context('with logged in', () => {
    it('renders the login fields', () => {
      const {
        queryByPlaceholderText,
        container,
      } = renderLoginForm({ isLogin: true });

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

      fireEvent.click(queryByText('Log In'));

      expect(handleSubmit).toBeCalled();
    });
  });

  context('without logged in', () => {
    it('renders the sign up fields', () => {
      const {
        queryByPlaceholderText,
        container,
      } = renderLoginForm({ isLogin: false });

      expect(queryByPlaceholderText('First Name')).not.toBeNull();
      expect(queryByPlaceholderText('Last Name')).not.toBeNull();

      expect(container).toHaveTextContent('Passwords must be longer than 7');
    });

    it('listens change events for "Sign UP"', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: false,
      });

      fireEvent.change(getByPlaceholderText('First Name'), {
        target: { value: 'gunhee' },
      });

      expect(handleChange).toBeCalledWith({
        name: 'firstName', value: 'gunhee',
      });
    });

    it('renders "Sign Up" button', () => {
      const { queryByText } = renderLoginForm({ isLogin: false });

      fireEvent.click(queryByText('Sign Up'));

      expect(handleSubmit).toBeCalled();
    });
  });
});
