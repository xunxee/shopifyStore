import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setIsAccountModalOpen,
  logout,
} from '../LoginPage/slice';

import HeaderContainer from './HeaderContainer';

jest.mock('react-redux');

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  const handleClick = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  useDispatch.mockImplementation(() => dispatch);

  function renderHeaderContainer() {
    return render((
      <HeaderContainer
        onClick={handleClick}
      />
    ));
  }

  it('renders the categories list', () => {
    const { container } = renderHeaderContainer();

    expect(container).toHaveTextContent('New Arrivals');
  });

  it('renders the search bar', () => {
    const { queryByPlaceholderText } = renderHeaderContainer();

    expect(queryByPlaceholderText('Search for products...'))
      .not.toBeNull();
  });

  it('renders the shopping cart', () => {
    const { queryByTitle } = renderHeaderContainer();

    expect(queryByTitle('shoppingCart')).not.toBeNull();
  });

  it('renders "circleUser" icon', () => {
    const { getByRole } = renderHeaderContainer();

    fireEvent.click(getByRole(
      'button',
      { name: 'circleUser' },
    ));

    expect(dispatch).toBeCalledWith(
      setIsAccountModalOpen(),
    );
  });

  context('when click All', () => {
    it('occurs handle event', () => {
      const { getByText } = renderHeaderContainer();

      fireEvent.click(getByText('All'));

      expect(handleClick).toBeCalledWith('/search');
    });
  });

  context('when click New Arrivals', () => {
    it('occurs handle event', () => {
      const { getByText } = renderHeaderContainer();

      fireEvent.click(getByText('New Arrivals'));

      expect(dispatch).toBeCalledWith({
        type: 'list/changeAllCategories',
        payload: {
          name: 'new',
          belong: 'category',
        },
      });
    });
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
        list: {
          category: '',
        },
      }));
    });

    context('when logged in', () => {
      it('renders LoginPage', () => {
        const {
          queryByPlaceholderText,
        } = renderHeaderContainer();

        expect(queryByPlaceholderText('Email'))
          .not.toBeNull();
      });
    });

    context('when logged out', () => {
      given('refreshToken', () => 'REFRESH_TOKEN');

      it('renders LogoutPage', () => {
        const { queryByText } = renderHeaderContainer();

        fireEvent.click(queryByText('Log out'));

        expect(dispatch).toBeCalledWith(logout());
      });
    });
  });
});
