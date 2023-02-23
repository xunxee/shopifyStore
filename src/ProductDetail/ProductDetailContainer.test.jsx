import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ProductDetailContainer from './ProductDetailContainer';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

import { selectColor, selectSize } from './slice';

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
      const { getByText, getByTitle } = renderProductDetailContainer();

      fireEvent.click(getByText('S'));

      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        selectSize('S'),
      );

      fireEvent.click(getByTitle('white'));

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        selectColor('white'),
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
