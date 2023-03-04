import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ProductDetailContainer from './ProductDetailContainer';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

import {
  selectColor,
  selectSize,
  setIsInfoOpen,
} from './slice';

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

    it('listens color click event', () => {
      const { getByTitle } = renderProductDetailContainer();

      fireEvent.click(getByTitle('white'));

      expect(dispatch).toHaveBeenNthCalledWith(
        3,
        selectColor('white'),
      );
    });

    it('listens size click event', () => {
      const { getByText } = renderProductDetailContainer();

      fireEvent.click(getByText('L'));

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        selectSize('L'),
      );
    });

    it('listens "Additional Info" click event', () => {
      const { getByText } = renderProductDetailContainer();

      fireEvent.click(getByText('Care'));

      expect(dispatch).toHaveBeenNthCalledWith(
        4,
        setIsInfoOpen({ name: 'care' }),
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
