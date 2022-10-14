import { render } from '@testing-library/react';

import FooterTopTitle from './FooterTopTitle';

describe('FooterTopTitle', () => {
  it('renders the title', () => {
    const { container } = render(<FooterTopTitle />);

    expect(container).toHaveTextContent('Shopify Store');
  });
});
