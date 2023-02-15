import { render, fireEvent } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  const handleClickCategories = jest.fn();

  it('renders the categories', () => {
    const { getByText } = render(
      <CategoryBar
        field="categories"
        selectedItem="new"
        onClick={handleClickCategories}
      />,
    );

    fireEvent.click(getByText('New Arrivals'));

    expect(handleClickCategories).toBeCalledWith({
      name: 'new',
      belong: 'category',
    });
  });
});
