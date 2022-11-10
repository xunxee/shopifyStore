import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoginModalOpen } from '../LoginPage/slice';

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

    expect(dispatch).toBeCalledWith(setIsLoginModalOpen());
  });
  describe('login modal', () => {
    context('when login modal is open', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
          login: {
            isLoginModalOpen: true,
            loginFields: {
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              error: '',
            },
          },
        }));
      });

      it('renders LoginPage', () => {
        const { queryByPlaceholderText } = render((
          <HeaderPage />
        ));

        expect(queryByPlaceholderText('Email')).not.toBeNull();
      });
    });

    context('when login modal is closed', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
          login: {
            isLoginModalOpen: false,
            loginFields: {
              email: '',
              password: '',
              firstName: '',
              lastName: '',
              error: '',
            },
          },
        }));
      });

      it('unable to render LoginPage', () => {
        const { queryByPlaceholderText } = render((
          <HeaderPage />
        ));

        expect(queryByPlaceholderText('Email')).toBeNull();
      });
    });
  });
});
