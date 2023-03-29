import { fireEvent, render } from '@testing-library/react';

import SecondaryProduct from './SecondaryProduct';

import HOME_PAGE_PRODUCT_LIST from '../../../fixtures/HomePage/homePageProductList';

const { secondary } = HOME_PAGE_PRODUCT_LIST;

describe('SecondaryProduct', () => {
  const handleClick = jest.fn();

  function renderMainProduct(
    { productList = secondary } = {},
  ) {
    return render(<SecondaryProduct
      productList={productList}
      onClick={handleClick}
    />);
  }

  it('renders the title', () => {
    const { container } = renderMainProduct();

    expect(container).toHaveTextContent('Special Edition T-Shirt');
  });

  context('when SecondaryProduct is clicked', () => {
    it('goes to SecondaryProduct detail page', () => {
      const { getAllByText } = renderMainProduct();

      fireEvent.click(getAllByText('Special Edition T-Shirt')[0]);

      expect(handleClick).toBeCalledWith('product/2');
    });
  });
});
