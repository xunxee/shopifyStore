import { render } from '@testing-library/react';

import HomePage from './HomePage';

describe('Homepage', () => {
  it('renders the home page', () => {
    const { container } = render(
      <HomePage />,
    );

    expect(container).toHaveTextContent('HomePage');
  });
});
