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
          email: {
            value: '',
            checkMessage: '',
          },
          password: {
            value: '',
            checkMessage: '',
          },
          firstName: {
            value: '',
            checkMessage: '',
          },
          lastName: {
            value: '',
            checkMessage: '',
          },
          error: {
            value: '',
          },
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

    it('renders "Log In" button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });

    it('renders "Sign Up" button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Sign Up'));

      expect(dispatch).toBeCalledWith({
        type: 'login/setIsLogin',
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

    it('renders "Sing Up" button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Sign Up'));

      expect(dispatch).toBeCalled();
    });

    it('renders "Log In" button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalledWith({
        type: 'login/setIsLogin',
      });
    });
  });
});
