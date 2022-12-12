import { render, fireEvent } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  const handleClickCategories = jest.fn();
  const handleClickProducts = jest.fn();

  it('renders the categories', () => {
    const { queryByText } = render((
      <CategoryBar
        category="new"
        onClickCategory={handleClickCategories}
      />
    ));

    fireEvent.click(queryByText('New Arrivals'));

    expect(handleClickCategories).toBeCalled();
  });

  it('renders the products', () => {
    const { queryByText } = render((
      <CategoryBar
        product="beds"
        onClickProduct={handleClickProducts}
      />
    ));

    fireEvent.click(queryByText('Beds'));

    expect(handleClickProducts).toBeCalled();
  });
});
