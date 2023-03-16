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
            topProductList: given.topProductList,
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

  context('when initially rendered', () => {
    given('topProductList', () => []);

    it("doesn't render component", () => {
      const { container } = renderHomePageContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });

  context("when it's not the first rendering", () => {
    given('topProductList', () => topProductList);

    it("doesn't render component", () => {
      const { container } = renderHomePageContainer();

      expect(container).toHaveTextContent('ACME Cup');
    });
  });
});
