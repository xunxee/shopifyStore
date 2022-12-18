import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  const handleClick = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    handleClick.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation(
      (selector) => (selector({
        list: {
          category: given.category,
          product: given.product,
          sort: given.sort,
          material: given.material,
        },
      })),
    );
  });

  function renderListContainer(
    { pathname, search } = {},
  ) {
    return render((
      <ListContainer
        onClickCategories={handleClick}
        pathname={pathname}
        search={search}
      />
    ));
  }

  it('renders categories', () => {
    const { getByText } = renderListContainer();

    fireEvent.click(getByText('New Arrivals'));

    expect(handleClick).toBeCalled();
  });
});
