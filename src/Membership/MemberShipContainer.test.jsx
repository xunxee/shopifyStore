import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MembershipContainer from './MembershipContainer';

jest.mock('react-redux');

describe('MembershipContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      membership: {
        isLogin: given.isLogin,
        accountFields: {
          email: {
            value: 'tester@example.co',
            validationMessage: '',
          },
          password: {
            value: 'Tester123@',
            validationMessage: '',
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
      const { container } = render(<MembershipContainer />);

      expect(container).toHaveTextContent("Don't have an account?");
    });

    it('listens change events', () => {
      const { getByPlaceholderText } = render(<MembershipContainer />);

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalled();
    });

    it('renders "Log In" button', () => {
      const { getByText } = render(<MembershipContainer />);

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });
  });

  context('without logged in', () => {
    given('isLogin', () => false);
    given('firstName', () => '건희');
    given('lastName', () => '정');

    it('renders the sign up fields', () => {
      const { container } = render(<MembershipContainer />);

      expect(container).toHaveTextContent('Passwords must be longer than 7');
    });

    it('renders "Sing Up" button', () => {
      given('isButtonActive', () => true);

      const { getByText } = render(<MembershipContainer />);

      fireEvent.click(getByText('Sign Up'));

      expect(dispatch).toBeCalled();
    });

    it('renders "Log In" button', () => {
      const { getByText } = render(<MembershipContainer />);

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalledWith({
        type: 'membership/setIsLogin',
      });
    });

    it('listens change events', () => {
      const { getByPlaceholderText } = render(<MembershipContainer />);

      fireEvent.change(getByPlaceholderText('Email'), {
        target: { value: 'tester@example.com' },
      });

      expect(dispatch).toBeCalled();
    });

    it('listens blur events', () => {
      given('isButtonActive', () => false);

      const { getByPlaceholderText } = render(<MembershipContainer />);

      const inputBox = getByPlaceholderText('성(Last Name)');

      inputBox.focus();
      inputBox.blur();

      expect(dispatch).toBeCalled();
    });

    context('when isButtonActive is true', () => {
      given('isButtonActive', () => true);

      it("doesn't fire onBlur event", () => {
        const { getByPlaceholderText } = render(<MembershipContainer />);

        const inputBox = getByPlaceholderText('성(Last Name)');

        inputBox.focus();
        inputBox.blur();

        expect(dispatch).not.toBeCalled();
      });
    });
  });
});
