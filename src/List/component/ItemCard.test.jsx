import { render } from '@testing-library/react';

import ItemCard from './ItemCard';

describe('ItemCard', () => {
  const productList = {
    title: 'Special Edition T-Shirt',
    price: '$50.00 USD',
    img: 'https://user-images.githubusercontent.com/87808288/209490726-1626694c-35c8-49db-a082-0e6e1001310e.png',
  };

  it('renders the title', () => {
    const { container } = render((
      <ItemCard
        product={productList}
      />
    ));

    expect(container).toHaveTextContent('Special Edition T-Shirt');
  });
});
