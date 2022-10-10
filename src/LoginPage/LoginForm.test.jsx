import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleClick = jest.fn();

  function renderLoginForm({ isLogin }) {
    return render((
      <LoginForm
        onClick={handleClick}
        isLogin={isLogin}
      />
    ));
  }

  context('with logged in', () => {
    it('renders the login fileds', () => {
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
  });

  context('without logged in', () => {
    it('renders the sign up fileds', () => {
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
