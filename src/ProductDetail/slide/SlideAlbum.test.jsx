import { fireEvent, render } from '@testing-library/react';

import SlideAlbum from './SlideAlbum';

import PRODUCT from '../../../fixtures/MockData/product';

describe('SlideAlbum', () => {
  const handleSetState = jest.fn();

  function renderSlideAlbum({
    title = PRODUCT.title,
    imageList = PRODUCT.imageList,
  } = {}) {
    return render((
      <SlideAlbum
        title={title}
        imageList={imageList}
        currentSlideNumber={5}
        setSlide={handleSetState}
      />
    ));
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
        number: 7,
        isMotion: true,
      });
    });
  });
});
