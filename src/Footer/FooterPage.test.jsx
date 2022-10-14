import { render } from '@testing-library/react';

import FooterPage from './FooterPage';

describe('FooterPage', () => {
  it('renders the LogoContainer', () => {
    const { container } = render(<FooterPage />);

    expect(container).toHaveTextContent('Shopify Store');
  });
});
