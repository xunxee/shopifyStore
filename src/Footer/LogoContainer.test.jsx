import { render } from '@testing-library/react';

import LogoContainer from './LogoContainer';

describe('LogoContainer', () => {
  it('renders the title', () => {
    const { container } = render(<LogoContainer />);

    expect(container).toHaveTextContent('Shopify Store');
  });
});
