import { MemoryRouter } from 'react-router-dom';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  function renderListContainer() {
    return render((
      <MemoryRouter>
        <ListContainer />
      </MemoryRouter>
    ));
  }

  it('renders the categories', () => {
    const { queryByText } = renderListContainer();

    fireEvent.click(queryByText('New Arrivals'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesCategories',
      payload: 'new',
    });
  });

  it('renders the products', () => {
    const { queryByText } = renderListContainer();

    fireEvent.click(queryByText('Beds'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesProducts',
      payload: 'beds',
    });
  });

  it('renders the sort', () => {
    const { queryByText } = renderListContainer();

    fireEvent.click(queryByText('Trending'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesSort',
      payload: 'trending',
    });
  });

  it('renders the material', () => {
    const { queryByText } = renderListContainer();

    fireEvent.click(queryByText('Fabric'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesMaterial',
      payload: 'fabric',
    });
  });
});
