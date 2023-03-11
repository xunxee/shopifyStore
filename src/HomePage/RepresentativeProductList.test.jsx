import { render } from '@testing-library/react';

import RepresentativeProductList from './RepresentativeProductList';

import HOME_PAGE_PRODUCT_LIST from '../../fixtures/HomePage/homePageProductList';

const { topProductList } = HOME_PAGE_PRODUCT_LIST;

describe('RepresentativeProductList', () => {
  function renderRepresentativeProductList(
    { productList } = {},
  ) {
    return render(
      <RepresentativeProductList
        productList={productList}
      />,
    );
  }

  it('renders the title', () => {
    const { container } = renderRepresentativeProductList(
      { productList: topProductList },
    );

    expect(container).toHaveTextContent('RepresentativeProductList');
  });
});
