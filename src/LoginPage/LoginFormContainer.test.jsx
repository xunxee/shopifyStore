import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  context('When the value of isLoginState is true', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        isLoginState: true,
      }));
    });

    it('renders LoginForm', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent("Don't have an account?");
    });
  });

  context('When the value of isLoginState is false', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        isLoginState: false,
      }));
    });

    it('renders SignUpForm', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent('Passwords must be longer than 7');
    });
  });
});
