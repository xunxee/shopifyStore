import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import HomePage from './HomePage';

import HOME_PAGE_PRODUCT_LIST from '../../fixtures/HomePage/homePageProductList';

const {
  topProductList,
  recommendedProductList,
} = HOME_PAGE_PRODUCT_LIST;

jest.mock('react-redux');

const dispatch = jest.fn();

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate() {
    return mockUseNavigate;
  },
}));

describe('Homepage', () => {
  beforeEach(() => {
    dispatch.mockClear();

    mockUseNavigate.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector(
      {
        homePage: {
          homePageProductList: {
            topProductList,
            recommendedProductList,
          },
        },
      },
    ));
  });

  function renderHomePage() {
    return render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  }

  it('renders the home page', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent('ACME Cup');
  });

  context('when MainProduct is clicked', () => {
    it('goes to MainProduct detail page', () => {
      const { getAllByText } = renderHomePage();

      fireEvent.click(getAllByText('ACME Cup')[0]);

      expect(mockUseNavigate).toBeCalledWith('product/1');
    });
  });
});
