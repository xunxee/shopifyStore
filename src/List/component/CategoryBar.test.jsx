import { render, fireEvent } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  const handleClickCategory = jest.fn();

  it('renders the categories', () => {
    const { getByText } = render((
      <CategoryBar
        title="All Categories"
        keyword="categories"
        item="new"
        onClick={handleClickCategory}
      />
    ));

    fireEvent.click(getByText('New Arrivals'));

    expect(handleClickCategory).toBeCalledWith(
      'new',
    );
  });
});
