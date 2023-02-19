import { render } from '@testing-library/react';

import DetailOptionButton from './DetailOptionButton';

import PRODUCT_DETAIL from '@fixtures/ProductDetail/productDetail';

const { sizes } = PRODUCT_DETAIL;

describe('DetailOptionButton', () => {
  it('renders the Button', () => {
    const { container } = render(
      <DetailOptionButton
      options={sizes}
      />,
    );

    expect(container).toHaveTextContent('XL');
  });
});
