import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      login: {
        isLogin: given.isLogin,
        loginFields: {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
        },
      },
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

    it('listens change events', () => {
      const { getByPlaceholderText } = render((
        <LoginFormContainer />
      ));

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'login/changeLoginFields',
        payload: { name: 'email', value: 'new email' },
      });
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
