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
            value: 'tester@example.com',
          },
          password: {
            value: 'Tester123@',
          },
          firstName: {
            value: given.firstName,
          },
          lastName: {
            value: given.lastName,
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
  });

  context('without logged in', () => {
    given('isLogin', () => false);
    given('firstName', () => '건희');
    given('lastName', () => '정');

    it('renders the sign up fields', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent(
        'Passwords must be longer than 7',
      );
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

    it('listens blur events', () => {
      const { queryByPlaceholderText } = render((
        <LoginFormContainer />
      ));

      const inputBox = queryByPlaceholderText(
        '성(Last Name)',
      );

      inputBox.focus();
      inputBox.blur();

      expect(dispatch).toBeCalled();
    });
  });
});
