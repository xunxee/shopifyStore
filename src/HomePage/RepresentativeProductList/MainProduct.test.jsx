import { render } from '@testing-library/react';

import MainProduct from './MainProduct';

import HOME_PAGE_PRODUCT_LIST from '../../../fixtures/HomePage/homePageProductList';

const { topProductList } = HOME_PAGE_PRODUCT_LIST;

describe('MainProduct', () => {
  function renderMainProduct() {
    return render(
      <MainProduct productList={topProductList[0]} />,
    );
  }

  it('renders the title', () => {
    const { container } = renderMainProduct();

    expect(container).toHaveTextContent('ACME Cup');
  });
});
