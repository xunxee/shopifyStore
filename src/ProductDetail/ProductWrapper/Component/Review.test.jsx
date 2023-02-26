import { render } from '@testing-library/react';

import Review from './Review';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

const { evaluation } = PRODUCT_DETAIL;

describe('Review', () => {
  it('renders the review score', () => {
    function renderReview() {
      return render(
        <Review
          evaluation={evaluation}
        />,
      );
    }

    const { container } = renderReview();

    expect(container).toHaveTextContent('5');
  });
});
