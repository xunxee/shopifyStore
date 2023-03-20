import { render } from '@testing-library/react';

import RepresentativeProductList from './RepresentativeProductList';

import HOME_PAGE_PRODUCT_LIST from '../../fixtures/HomePage/homePageProductList';

const { topProductList } = HOME_PAGE_PRODUCT_LIST;

describe('RepresentativeProductList', () => {
  function renderRepresentativeProductList(
    { name, productList = topProductList } = {},
  ) {
    return render(
      <RepresentativeProductList
        name={name}
        productList={productList}
      />,
    );
  }

  context('when have to show a popular product', () => {
    it('renders the title', () => {
      const { container } = renderRepresentativeProductList(
        { name: 'main' },
      );

      expect(container).toHaveTextContent('ACME Cup');
    });
  });

  context('when have to show a recommended product', () => {
    it('renders flipped horizontally', () => {
      const { container } = renderRepresentativeProductList(
        { name: 'recommended' },
      );

      expect(container).toHaveTextContent('ACME Cup');
    });
  });
});
