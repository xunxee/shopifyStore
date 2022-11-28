import { render } from '@testing-library/react';

import ListPage from './ListPage';

describe('ListPage', () => {
  it('renders title', () => {
    const { queryByText } = render((
      <ListPage />
    ));

    expect(queryByText('All Categories')).not.toBeNull();
  });
});
