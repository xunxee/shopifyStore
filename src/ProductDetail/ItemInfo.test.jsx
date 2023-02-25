import { render } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import ItemInfo from './ItemInfo';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

const {
  sizes, colors, details, evaluation,
} = PRODUCT_DETAIL;

describe('ItemInfo', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
  });

  function renderItemInfo() {
    return render(
      <ItemInfo
        sizes={sizes}
        colors={colors}
        details={details}
        evaluation={evaluation}
      />,
    );
  }

  it('renders product details', () => {
    const { container } = renderItemInfo();

    expect(container).toHaveTextContent('XL');
  });
});
