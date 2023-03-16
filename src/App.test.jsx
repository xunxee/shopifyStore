import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import App from './App';

import HOME_PAGE_PRODUCT_LIST from '../fixtures/HomePage/homePageProductList';

const {
  topProductList,
  recommendedProductList,
} = HOME_PAGE_PRODUCT_LIST;

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selection) => selection({
      membership: {},
      header: {
        searchBarFields: {},
      },
      homePage: {
        homePageProductList: {
          topProductList,
          recommendedProductList,
        },
      },
    }));
  });

  function renderApp({ path }) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    );
  }

  context('with path /', () => {
    it('renders the home page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('ACME Cup');
    });
  });

  context('with invalid path', () => {
    it('renders the not found page', () => {
      const { container } = renderApp({ path: '/xxx' });

      expect(container).toHaveTextContent('Not Found');
    });
  });
});
