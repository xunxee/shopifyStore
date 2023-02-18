import { render } from '@testing-library/react';

import ItemInfo from './ItemInfo';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

const {
  sizes, colors, details, evaluation,
} = PRODUCT_DETAIL;

describe('ItemInfo', () => {
  function renderItemInfo() {
    return render(
      <ItemInfo
        sizes={sizes}
        colors={colors}
        details={details}
        evaluation={evaluation}
      />,
    );
  }

  it('renders product details', () => {
    const { container } = renderItemInfo();

    expect(container).toHaveTextContent('XL');
  });
});
