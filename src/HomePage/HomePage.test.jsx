import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

describe('Homepage', () => {
  it('renders the home page', () => {
    const { container } = render((
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('HomePage');
  });
});
