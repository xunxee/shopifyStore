import { render, fireEvent } from '@testing-library/react';

import ItemCard from './ItemCard';

import PRODUCT_DETAIL from '../../../fixtures/List/productDetail';

describe('ItemCard', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  function renderItemCard() {
    return render((
      <ItemCard
        product={PRODUCT_DETAIL}
        onClick={handleClick}
      />
    ));
  }

  it('renders the title', () => {
    const { container, getByText } = renderItemCard();

    expect(container).toHaveTextContent('Special Edition T-Shirt');

    fireEvent.click(getByText('Special Edition T-Shirt'));

    expect(handleClick).toBeCalled();
  });
});
