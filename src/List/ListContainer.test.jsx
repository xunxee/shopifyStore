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

  it('renders the categories', () => {
    const { queryByText } = render(<ListContainer />);

    fireEvent.click(queryByText('New Arrivals'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesCategories',
      payload: 'new',
    });
  });

  it('renders the products', () => {
    const { queryByText } = render(<ListContainer />);

    fireEvent.click(queryByText('Beds'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesProducts',
      payload: 'beds',
    });
  });

  it('renders the sort', () => {
    const { queryByText } = render(<ListContainer />);

    fireEvent.click(queryByText('Trending'));

    expect(dispatch).toBeCalledWith({
      type: 'list/changesSort',
      payload: 'trending',
    });
  });
});
