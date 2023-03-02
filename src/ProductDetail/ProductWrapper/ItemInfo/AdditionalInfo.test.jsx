import { render } from '@testing-library/react';

import AdditionalInfo from './AdditionalInfo';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

const { care } = PRODUCT_DETAIL;

describe('AdditionalInfo', () => {
  function renderAdditionalInfo(
    { isCareInfoOpen = false } = {},
  ) {
    return render(
      <AdditionalInfo
        product={PRODUCT_DETAIL}
        isCareInfoOpen={isCareInfoOpen}
      />,
    );
  }

  it('renders the title', () => {
    const { container } = renderAdditionalInfo();

    expect(container).toHaveTextContent('Care');
  });

  context('when you click on "Care" on the product detail page', () => {
    it('renders the info for "Care"', () => {
      const { container } = renderAdditionalInfo(
        { isCareInfoOpen: true },
      );

      expect(container).toHaveTextContent(care);
    });
  });
});
