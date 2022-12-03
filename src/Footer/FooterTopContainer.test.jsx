import { render } from '@testing-library/react';

import FooterTopContainer from './FooterTopContainer';

describe('FooterTopContainer', () => {
  it('renders the title', () => {
    const { container } = render(<FooterTopContainer />);

    expect(container).toHaveTextContent('Shopify');
  });

  it('renders the list', () => {
    const { container } = render(<FooterTopContainer />);

    expect(container).toHaveTextContent('Privacy Policy');
  });

  it('renders the info', () => {
    const { container } = render(<FooterTopContainer />);

    expect(container).toHaveTextContent('GitHub');
  });
});
