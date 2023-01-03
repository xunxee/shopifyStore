import { render } from '@testing-library/react';

import ProductDetailPage from './ProductDetailPage';

describe('ProductDetailPage', () => {
  it('renders the title', () => {
    const { container } = render((
      <ProductDetailPage />
    ));

    expect(container).toHaveTextContent('Product Detail Page');
  });
});
