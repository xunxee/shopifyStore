import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import ListPage from './ListPage';

jest.mock('react-redux');

const dispatch = jest.fn();

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate() {
    return mockUseNavigate;
  },
  useLocation: () => ({
    pathname: '/search/featured',
    search: '',
  }),
}));

describe('ListPage', () => {
  beforeEach(() => {
    dispatch.mockClear();

    mockUseNavigate.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation(
      (selector) => (selector({
        list: {
          url: {
            category: '',
            product: '',
            sort: '',
            material: '',
          },
          productList: [],
        },
      })),
    );
  });

  function renderListPage() {
    return render((
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>
    ));
  }

  it('renders title', () => {
    const { queryByText } = renderListPage();

    expect(queryByText('All Categories'))
      .not.toBeNull();
  });

  it('clicks New Arrivals', () => {
    const { getByText } = renderListPage();

    fireEvent.click(getByText('New Arrivals'));
  });
});
