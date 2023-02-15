import { render } from '@testing-library/react';

import RelatedProducts from './RelatedProducts';

describe('RelatedProducts', () => {
  it('renders the title', () => {
    const { container } = render(<RelatedProducts />);

    expect(container).toHaveTextContent('Related');
  });
});
