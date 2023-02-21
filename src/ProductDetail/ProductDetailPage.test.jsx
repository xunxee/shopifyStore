import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ProductDetailPage from './ProductDetailPage';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

describe('ProductDetailPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      productDetail: {
        product: PRODUCT_DETAIL,
      },
    }));
  });

  it('renders product name', () => {
    const params = { id: '1' };

    const { container } = render(<ProductDetailPage params={params} />);

    expect(container).toHaveTextContent('Special Edition T-Shirt');
  });
});
