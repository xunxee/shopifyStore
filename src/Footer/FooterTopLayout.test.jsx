import { render } from '@testing-library/react';

import FooterTopLayout from './FooterTopLayout';

describe('FooterTopContainer', () => {
  it('renders the title', () => {
    const { container } = render(<FooterTopLayout />);

    expect(container).toHaveTextContent('Shopify');
  });

  it('renders the list', () => {
    const { container } = render(<FooterTopLayout />);

    expect(container).toHaveTextContent('Privacy Policy');
  });

  it('renders the info', () => {
    const { container } = render(<FooterTopLayout />);

    expect(container).toHaveTextContent('GitHub');
  });
});
