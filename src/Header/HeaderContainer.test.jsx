import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setIsAccountModalOpen,
  logout,
} from '../Membership/slice';

import { changeSearchBarFields } from './slice';

import HeaderContainer from './HeaderContainer';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';
import { changeUrlAllDataFields } from '../List/slice';

const { initialCategoryList } = LIST_CATEGORIES;

jest.mock('react-redux');

describe('HeaderContainer', () => {
  const dispatch = jest.fn();

  const handleClick = jest.fn();
  const handleKeyDown = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      membership: {
        isAccountModalOpen: given.isAccountModalOpen,
        accountFields: {
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
      header: {
        searchBarFields: {
          value: '',
        },
      },
    }));
  });

  function renderHeaderContainer() {
    return render((
      <HeaderContainer
        onClick={handleClick}
        onKeyDown={handleKeyDown}
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

  context('when click on "All"', () => {
    it('clears all selection of "CategoryBar"', () => {
      const { getByText } = renderHeaderContainer();

      fireEvent.click(getByText('All'));

      expect(handleClick).toBeCalledWith('/search');
    });
  });

  context('when click on "New Arrivals"', () => {
    it('clears all "CategoryBar" expect "All Categories" selected', () => {
      const { getByText } = renderHeaderContainer();

      fireEvent.click(getByText('New Arrivals'));

      expect(dispatch).toBeCalledWith(
        changeUrlAllDataFields({
          ...initialCategoryList,
          category: 'new',
        }),
      );
    });
  });

  context('when enter an item in the search bar', () => {
    it('listens change events', () => {
      const { getByPlaceholderText } = renderHeaderContainer();

      fireEvent.change(getByPlaceholderText('Search for products...'), {
        target: { value: 'beds' },
      });

      expect(dispatch).toBeCalledWith(
        changeSearchBarFields({ value: 'beds' }),
      );
    });
  });

  describe('modal', () => {
    given('isAccountModalOpen', () => 'false');

    context('when logged in', () => {
      it('renders MembershipPage', () => {
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
        const { getByText } = renderHeaderContainer();

        fireEvent.click(getByText('Log out'));

        expect(dispatch).toBeCalledWith(logout());
      });
    });
  });
});
