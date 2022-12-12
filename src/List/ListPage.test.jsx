import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import ListPage from './ListPage';

describe('ListPage', () => {
  it('renders title', () => {
    const { queryByText } = render((
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>
    ));

    expect(queryByText('All Categories')).not.toBeNull();
  });
});
