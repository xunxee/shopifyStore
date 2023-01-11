import { render, fireEvent } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  const handleClick = jest.fn();

  it('renders the categories', () => {
    const { getByText } = render((
      <CategoryBar
        field="categories"
        selectedItem="new"
        onClick={handleClick}
      />
    ));

    fireEvent.click(getByText('New Arrivals'));

    expect(handleClick).toBeCalledWith({
      name: 'new',
      belong: 'category',
    });
  });
});
