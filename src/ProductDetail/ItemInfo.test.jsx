import { render } from '@testing-library/react';

import ItemInfo from './ItemInfo';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

const {
  size, color, details, evaluation,
} = PRODUCT_DETAIL;

describe('ItemInfo', () => {
  function renderItemInfo() {
    return render(
      <ItemInfo
        size={size}
        color={color}
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
