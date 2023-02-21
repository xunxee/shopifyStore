import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ProductDetailContainer from './ProductDetailContainer';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

import { selectSize } from './slice';

describe('ProductDetailContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      productDetail: {
        product: given.product,
      },
    }));
  });

  function renderProductDetailContainer() {
    return render(
      <ProductDetailContainer />,
    );
  }

  context('with product', () => {
    given('product', () => PRODUCT_DETAIL);

    it('renders the title', () => {
      const { container } = renderProductDetailContainer();

      expect(container).toHaveTextContent('Special Edition T-Shirt');
    });

    it('listens click event', () => {
      const { getByText } = renderProductDetailContainer();

      fireEvent.click(getByText('S'));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        selectSize('S'),
      );
    });
  });

  context('without product', () => {
    given('product', () => ({
      imageList: [],
    }));

    it('returns null', () => {
      const { container } = render(<ProductDetailContainer />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
