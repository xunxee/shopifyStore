import { render } from '@testing-library/react';

import ProductWrapper from './ProductWrapper';

import PRODUCT from '../../fixtures/MockData/product';

describe('ProductWrapper', () => {
  it('renders the title', () => {
    const { title } = PRODUCT;

    const { container } = render((
      <ProductWrapper product={PRODUCT} />
    ));

    expect(container).toHaveTextContent(title);
  });

  it('renders the arrow icon', () => {
    const { getByTitle } = render((
      <ProductWrapper product={PRODUCT} />
    ));

    expect(getByTitle('leftArrow')).not.toBeNull();
  });
});
