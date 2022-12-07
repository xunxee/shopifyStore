import { render, fireEvent } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  const handleClick = jest.fn();

  it('renders the categories', () => {
    const { queryByText } = render((
      <CategoryBar
        onClickCategories={handleClick}
      />
    ));

    fireEvent.click(queryByText('New Arrivals'));

    expect(handleClick).toBeCalled();
  });
});
