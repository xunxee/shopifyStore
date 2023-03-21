import { render } from '@testing-library/react';

import AutoSlide from './AutoSlide';

import HOME_PRODUCT_LIST from '../../../fixtures/HomePage/homePageProductList';

const { topProductList } = HOME_PRODUCT_LIST;

describe('AutoSlide', () => {
  function renderAutoSlide() {
    return render(
      <AutoSlide
        productList={topProductList}
      />,
    );
  }

  it('renders the title', () => {
    const { container } = renderAutoSlide();

    expect(container).toHaveTextContent('ACME Cup');
  });
});
