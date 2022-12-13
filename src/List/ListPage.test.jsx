import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import ListPage from './ListPage';

describe('ListPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation(
      (selector) => (selector({
        list: {
          category: '',
          product: '',
          sort: '',
          material: '',
        },
      })),
    );
  });

  it('renders title', () => {
    const { queryByText } = render((
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>
    ));

    expect(queryByText('All Categories'))
      .not.toBeNull();
  });
});
