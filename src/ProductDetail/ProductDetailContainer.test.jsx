import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ProductDetailContainer from './ProductDetailContainer';

import PRODUCT_DETAIL from '@fixtures/ProductDetail/productDetail';

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

  context('with product', () => {
    given('product', () => PRODUCT_DETAIL);

    it('renders the title', () => {
      const { container } = render(<ProductDetailContainer />);

      expect(container).toHaveTextContent('Special Edition T-Shirt');
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
