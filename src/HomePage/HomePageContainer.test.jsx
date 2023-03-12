import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import HomePageContainer from './HomePageContainer';

import HOME_PAGE_PRODUCT_LIST from '../../fixtures/HomePage/homePageProductList';

const { topProductList } = HOME_PAGE_PRODUCT_LIST;

jest.mock('react-redux');

describe('HomePageContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector(
      {
        homePage: {
          homePageProductList: {
            topProductList,
            recommendedProductList: [],
          },
        },
      },
    ));
  });

  function renderHomePageContainer() {
    return render(
      <HomePageContainer />,
    );
  }

  it('renders the title', () => {
    const { container } = renderHomePageContainer();

    expect(container).toHaveTextContent('ACME Cup');
  });
});
