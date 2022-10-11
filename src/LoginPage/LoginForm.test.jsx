import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleClick = jest.fn();
  const handleChange = jest.fn();

  function renderLoginForm({ isLogin }) {
    return render((
      <LoginForm
        isLogin={isLogin}
        onClick={handleClick}
        onChange={handleChange}
      />
    ));
  }

  context('with logged in', () => {
    it('renders the login fields', () => {
      const {
        queryByPlaceholderText,
        container,
        getByText,
      } = renderLoginForm({ isLogin: true });

      expect(queryByPlaceholderText('First')).toBeNull();
      expect(queryByPlaceholderText('Last')).toBeNull();

      expect(container).toHaveTextContent('have an account?');

      fireEvent.click(getByText('Sign Up'));

      expect(handleClick).toBeCalled();
    });

    it('listens change events', () => {
      const { getByPlaceholderText } = renderLoginForm({
        isLogin: true,
      });

      const input = getByPlaceholderText('Email');
      const value = 'test@test.com';
      const name = 'email';

      fireEvent.change(input, { target: { value } });

      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  context('without logged in', () => {
    it('renders the sign up fields', () => {
      const {
        queryByPlaceholderText,
        container,
        getByText,
      } = renderLoginForm({ isLogin: false });

      expect(queryByPlaceholderText('First Name')).not.toBeNull();
      expect(queryByPlaceholderText('Last Name')).not.toBeNull();

      expect(container).toHaveTextContent('Passwords must be longer than 7');

      fireEvent.click(getByText('Log In'));

      expect(handleClick).toBeCalled();
    });
  });
});
