import { render } from '@testing-library/react';

import AdditionalInfo from './AdditionalInfo';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

const { care } = PRODUCT_DETAIL;

describe('AdditionalInfo', () => {
  function renderAdditionalInfo(
    { isCareModalOpen = false } = {},
  ) {
    return render(
      <AdditionalInfo
        product={PRODUCT_DETAIL}
        isCareModalOpen={isCareModalOpen}
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
        { isCareModalOpen: true },
      );

      expect(container).toHaveTextContent(care);
    });
  });
});
