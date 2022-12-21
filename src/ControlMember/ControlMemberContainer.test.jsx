import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ControlMemberContainer from './ControlMemberContainer';

jest.mock('react-redux');

describe('ControlMemberContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  beforeEach(() => {
    dispatch.mockClear();

    useSelector.mockImplementation((selector) => selector({
      login: {
        isLogin: given.isLogin,
        loginFields: {
          email: {
            value: 'tester@example.co',
            invalidCheckMessage: '',
          },
          password: {
            value: 'Tester123@',
            invalidCheckMessage: '',
          },
          firstName: {
            value: given.firstName,
          },
          lastName: {
            value: given.lastName,
          },
        },
        isButtonActive: given.isButtonActive,
      },
    }));
  });

  context('with logged in', () => {
    given('isLogin', () => true);
    given('isButtonActive', () => true);

    it('renders the login fields', () => {
      const { container } = render((
        <ControlMemberContainer />
      ));

      expect(container).toHaveTextContent("Don't have an account?");
    });

    it('listens change events', () => {
      const { getByPlaceholderText } = render((
        <ControlMemberContainer />
      ));

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalled();
    });

    it('renders "Log In" button', () => {
      const { getByText } = render((
        <ControlMemberContainer />
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
        <ControlMemberContainer />
      ));

      expect(container).toHaveTextContent(
        'Passwords must be longer than 7',
      );
    });

    it('renders "Sing Up" button', () => {
      given('isButtonActive', () => true);

      const { getByText } = render((
        <ControlMemberContainer />
      ));

      fireEvent.click(getByText('Sign Up'));

      expect(dispatch).toBeCalled();
    });

    it('renders "Log In" button', () => {
      const { getByText } = render((
        <ControlMemberContainer />
      ));

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalledWith({
        type: 'controlMember/setIsLogin',
      });
    });

    it('listens change events', () => {
      const { getByPlaceholderText } = render((
        <ControlMemberContainer />
      ));

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'tester@example.com' },
      });

      expect(dispatch).toBeCalled();
    });

    it('listens blur events', () => {
      given('isButtonActive', () => false);

      const { getByPlaceholderText } = render((
        <ControlMemberContainer />
      ));

      const inputBox = getByPlaceholderText(
        '성(Last Name)',
      );

      inputBox.focus();
      inputBox.blur();

      expect(dispatch).toBeCalled();
    });

    context('when isButtonActive is true', () => {
      given('isButtonActive', () => true);

      it("doesn't fire onBlur event", () => {
        const { getByPlaceholderText } = render((
          <ControlMemberContainer />
        ));

        const inputBox = getByPlaceholderText(
          '성(Last Name)',
        );

        inputBox.focus();
        inputBox.blur();

        expect(dispatch).not.toBeCalled();
      });
    });
  });
});
