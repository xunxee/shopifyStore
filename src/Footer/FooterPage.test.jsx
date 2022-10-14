import { render } from '@testing-library/react';

import FooterPage from './FooterPage';

describe('FooterPage', () => {
  it('renders the FooterTopContainer', () => {
    const { container } = render(<FooterPage />);

    expect(container).toHaveTextContent('Shopify Store');
  });

  it('renders the FooterBottomContainer', () => {
    const { container } = render(<FooterPage />);

    expect(container).toHaveTextContent('All rights reserved');
  });
});
