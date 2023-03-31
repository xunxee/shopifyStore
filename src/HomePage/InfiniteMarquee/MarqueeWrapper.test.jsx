import { render } from '@testing-library/react';

import MarqueeWrapper from './MarqueeWrapper';

import HOME_PAGE_PRODUCT_LIST from '../../../fixtures/HomePage/homePageProductList';

const { topProductList } = HOME_PAGE_PRODUCT_LIST;

describe('MarqueeWrapper', () => {
  function renderMarqueeWrapper() {
    return render(
      <MarqueeWrapper
        name="main"
        productList={topProductList}
      />,
    );
  }

  it('renders the title', () => {
    const { container } = renderMarqueeWrapper();

    expect(container).toHaveTextContent('ACME Cup');
  });
});
