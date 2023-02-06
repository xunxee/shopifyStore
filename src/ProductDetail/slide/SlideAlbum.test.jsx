import { render } from '@testing-library/react';

import SlideAlbum from './SlideAlbum';

import PRODUCT from '../../../fixtures/MockData/product';

describe('SlideAlbum', () => {
  function renderSlideAlbum({
    title = PRODUCT.title,
    banners = PRODUCT.banners,
  } = {}) {
    return render((
      <SlideAlbum
        title={title}
        banners={banners}
      />
    ));
  }

  context('without banners', () => {
    it('terminates the component', () => {
      const { container } = renderSlideAlbum({
        banners: null,
      });

      expect(container).toBeEmptyDOMElement();
    });
  });

  it('renders a list of product detail images', () => {
    const { getByTestId, getAllByTestId } = renderSlideAlbum();

    const ancestor = getByTestId('albumContainer');
    const descendant = getAllByTestId('detailImage')[0];

    expect(ancestor).toContainElement(descendant);
  });
});
