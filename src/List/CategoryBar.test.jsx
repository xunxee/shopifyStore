import { render } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  it('renders the categories', () => {
    const { container } = render((
      <CategoryBar />
    ));

    expect(container).toHaveTextContent('All Categories');

    expect(container).toHaveTextContent('All Products');
  });
});
