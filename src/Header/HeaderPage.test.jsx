import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setIsAccountModalOpen,
  logout,
} from '../LoginPage/slice';

import HeaderPage from './HeaderPage';

jest.mock('react-redux');

describe('HeaderPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  it('renders the categories list', () => {
    const { container } = render((
      <HeaderPage />
    ));

    expect(container).toHaveTextContent('New Arrivals');
  });

  it('renders the search bar', () => {
    const { queryByPlaceholderText } = render((
      <HeaderPage />
    ));

    expect(queryByPlaceholderText('Search for products...'))
      .not.toBeNull();
  });

  it('renders the shopping cart', () => {
    const { queryByTitle } = render((
      <HeaderPage />
    ));

    expect(queryByTitle('shoppingCart')).not.toBeNull();
  });

  it('renders "circleUser" icon', () => {
    const { getByRole } = render((
      <HeaderPage />
    ));

    fireEvent.click(getByRole(
      'button',
      { name: 'circleUser' },
    ));

    expect(dispatch).toBeCalledWith(setIsAccountModalOpen());
  });

  describe('modal', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        login: {
          isAccountModalOpen: true,
          loginFields: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            error: '',
          },
          refreshToken: given.refreshToken,
        },
      }));
    });

    context('when logged in', () => {
      it('renders LoginPage', () => {
        const { queryByPlaceholderText } = render((
          <HeaderPage />
        ));

        expect(queryByPlaceholderText('Email')).not.toBeNull();
      });
    });

    context('when logged out', () => {
      given('refreshToken', () => 'REFRESH_TOKEN');

      it('renders LogoutPage', () => {
        const { queryByText } = render((
          <HeaderPage />
        ));

        fireEvent.click(queryByText('Log out'));

        expect(dispatch).toBeCalledWith(logout());
      });
    });
  });
});
