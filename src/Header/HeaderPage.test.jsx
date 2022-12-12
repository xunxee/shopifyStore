import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setIsAccountModalOpen,
  logout,
} from '../LoginPage/slice';

import HeaderPage from './HeaderPage';

jest.mock('react-redux');

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate() {
    return mockUsedNavigate;
  },
}));

describe('HeaderPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  useDispatch.mockImplementation(() => dispatch);

  function renderHeaderPage() {
    return render((
      <MemoryRouter>
        <HeaderPage />
      </MemoryRouter>
    ));
  }

  it('renders the categories list', () => {
    const { container } = renderHeaderPage();

    expect(container).toHaveTextContent('New Arrivals');
  });

  it('renders the search bar', () => {
    const { queryByPlaceholderText } = renderHeaderPage();

    expect(queryByPlaceholderText('Search for products...'))
      .not.toBeNull();
  });

  it('renders the shopping cart', () => {
    const { queryByTitle } = renderHeaderPage();

    expect(queryByTitle('shoppingCart')).not.toBeNull();
  });

  it('renders "circleUser" icon', () => {
    const { getByRole } = renderHeaderPage();

    fireEvent.click(getByRole(
      'button',
      { name: 'circleUser' },
    ));

    expect(dispatch).toBeCalledWith(setIsAccountModalOpen());
  });

  context('when click All', () => {
    it('occurs handle event', () => {
      const { getByText } = renderHeaderPage();

      fireEvent.click(getByText('All'));

      expect(mockUsedNavigate).toBeCalledWith('/search');

      expect(dispatch).toBeCalledWith({
        payload: undefined,
        type: 'list/clearCategory',
      });
    });
  });

  context('when click New Arrivals', () => {
    it('occurs handle event', () => {
      const { getByText } = renderHeaderPage();

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
      }));
    });

    context('when logged in', () => {
      it('renders LoginPage', () => {
        const {
          queryByPlaceholderText,
        } = renderHeaderPage();

        expect(queryByPlaceholderText('Email'))
          .not.toBeNull();
      });
    });

    context('when logged out', () => {
      given('refreshToken', () => 'REFRESH_TOKEN');

      it('renders LogoutPage', () => {
        const { queryByText } = renderHeaderPage();

        fireEvent.click(queryByText('Log out'));

        expect(dispatch).toBeCalledWith(logout());
      });
    });
  });
});
