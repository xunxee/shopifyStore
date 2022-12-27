import { render } from '@testing-library/react';

import ItemList from './ItemList';

describe('ItemList', () => {
  const productList = [
    {
      id: 1,
      title: 'Special Edition T-Shirt',
      price: '$50.00 USD',
      img: 'https://user-images.githubusercontent.com/87808288/209490726-1626694c-35c8-49db-a082-0e6e1001310e.png',
    },
    {
      id: 2,
      title: 'Special Edition T-Shirt',
      price: '$50.00 USD',
      img: 'https://user-images.githubusercontent.com/87808288/209490726-1626694c-35c8-49db-a082-0e6e1001310e.png',
    },
  ];

  it('renders the title', () => {
    const { container } = render((
      <ItemList
        productList={productList}
      />
    ));

    expect(container).toHaveTextContent('ItemPage');
  });
});
