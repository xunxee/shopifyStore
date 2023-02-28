import { render } from '@testing-library/react';

import AdditionalInfo from './AdditionalInfo';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

describe('AdditionalInfo', () => {
  it('renders the title', () => {
    function renderAdditionalInfo() {
      return render(
        <AdditionalInfo
          product={PRODUCT_DETAIL}
        />,
      );
    }

    const { container } = renderAdditionalInfo();

    expect(container).toHaveTextContent('Care');
  });
});
