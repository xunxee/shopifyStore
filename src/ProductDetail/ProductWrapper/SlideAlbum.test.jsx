import { fireEvent, render } from '@testing-library/react';

import SlideAlbum from './SlideAlbum';

import PRODUCT_DETAIL from '@fixtures/ProductDetail/productDetail';

const { title, imageList } = PRODUCT_DETAIL;

describe('SlideAlbum', () => {
  const handleSetState = jest.fn();

  function renderSlideAlbum() {
    return render(
      <SlideAlbum
        title={title}
        imageList={imageList}
        currentSlideNumber={7}
        setSlide={handleSetState}
        BANNERS_COUNT={imageList.length}
      />,
    );
  }

  it('renders a list of product detail images', () => {
    const { getByTestId, getAllByTestId } = renderSlideAlbum();

    const ancestor = getByTestId('albumContainer');
    const descendant = getAllByTestId('detailImage')[0];

    expect(ancestor).toContainElement(descendant);
  });

  context('clicks the album image', () => {
    it("doesn't listen to click event", () => {
      const { getAllByTestId } = renderSlideAlbum();

      fireEvent.click(getAllByTestId('detailImage')[0]);

      expect(handleSetState).not.toBeCalled();
    });

    it('listens to click events', () => {
      const { getAllByTestId } = renderSlideAlbum();

      fireEvent.click(getAllByTestId('detailImage')[2]);

      expect(handleSetState).toBeCalledWith({
        number: 9,
        isMotion: true,
      });
    });
  });
});
