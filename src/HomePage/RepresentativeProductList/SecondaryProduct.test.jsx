import { render } from '@testing-library/react';

import SecondaryProduct from './SecondaryProduct';

import HOME_PAGE_PRODUCT_LIST from '../../../fixtures/HomePage/homePageProductList';

const { secondary } = HOME_PAGE_PRODUCT_LIST;

describe('SecondaryProduct', () => {
  function renderMainProduct(
    { productList = secondary } = {},
  ) {
    return render(<SecondaryProduct
      productList={productList}
    />);
  }

  it('renders the title', () => {
    const { container } = renderMainProduct();

    expect(container).toHaveTextContent('Special Edition T-Shirt');
  });
});
