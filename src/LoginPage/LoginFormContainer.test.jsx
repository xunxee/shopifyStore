import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      isLogin: given.isLogin,
    }));
  });

  context('with logged in', () => {
    given('isLogin', () => true);

    it('renders the login fields', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent("Don't have an account?");
    });
  });

  context('without logged in', () => {
    given('isLogin', () => false);

    it('renders the sign up fields', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent('Passwords must be longer than 7');
    });
  });
});
