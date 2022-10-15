import { render } from '@testing-library/react';

import HeaderPage from './HeaderPage';

describe('HeaderPage', () => {
  it('renders the categories list', () => {
    const { container } = render((
      <HeaderPage />
    ));

    expect(container).toHaveTextContent('New Arrivals');
  });

  it('renders the search bar', () => {
    const { queryByPlaceholderText } = render(<HeaderPage />);

    expect(queryByPlaceholderText('Search for products...')).not.toBeNull();
  });

  it('renders the shopping cart', () => {
    const { queryByTitle } = render(<HeaderPage />);

    expect(queryByTitle('shoppingCart')).not.toBeNull();
  });
});
