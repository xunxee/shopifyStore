import { fireEvent, render } from '@testing-library/react';

import ProductWrapper from './ProductWrapper';

import PRODUCT from '../../fixtures/MockData/product';

const { title: TITLE, imageList: IMAGE_LIST } = PRODUCT;

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => ['', mockSetState],
}));

describe('ProductWrapper', () => {
  beforeEach(() => {
    mockSetState.mockClear();
  });

  function renderProductWrapper({
    title = TITLE,
    imageList = IMAGE_LIST,
    isPassTheSlide = false,
    startNumber = 4,
    endNumber = 8,
  } = {}) {
    return render((
      <ProductWrapper
        product={{
          title,
          imageList,
        }}
        isPassTheSlide={isPassTheSlide}
        startNumber={startNumber}
        endNumber={endNumber}
      />
    ));
  }

  it('renders the title', () => {
    const { title } = PRODUCT;

    const { container } = render((
      <ProductWrapper product={PRODUCT} />
    ));

    expect(container).toHaveTextContent(title);
  });

  it('renders the arrow icon', () => {
    const { getByTitle } = render((
      <ProductWrapper product={PRODUCT} />
    ));

    expect(getByTitle('nextArrow')).not.toBeNull();
  });

  describe('click the previous button', () => {
    context('when reaches the previous slide', () => {
      it('moves without motion', () => {
        const { getByTitle } = renderProductWrapper({
          isPassTheSlide: true,
        });

        jest.useFakeTimers();
        fireEvent.click(getByTitle('previousArrow'));

        expect(mockSetState).toHaveBeenNthCalledWith(
          4,
          {
            isMotion: false,
            number: 8,
          },
        );

        jest.runAllTimers();

        jest.useRealTimers();
      });
    });

    context("when doesn't reach the previous slide", () => {
      it('moves with motion', () => {
        const { getByTitle } = renderProductWrapper();

        fireEvent.click(getByTitle('previousArrow'));

        expect(mockSetState).toHaveBeenNthCalledWith(
          4,
          expect.any(Function),
        );
      });
    });
  });

  describe('click the next button', () => {
    context('when reaches the next slide', () => {
      it('moves without motion', () => {
        const { getByTitle } = renderProductWrapper({
          isPassTheSlide: true,
        });

        jest.useFakeTimers();
        fireEvent.click(getByTitle('nextArrow'));

        expect(mockSetState).toHaveBeenNthCalledWith(
          4,
          { isMotion: false, number: 4 },
        );

        jest.runAllTimers();

        jest.useRealTimers();
      });
    });

    context("when doesn't reach the next slide", () => {
      it('moves with motion', () => {
        const { getByTitle } = renderProductWrapper();

        fireEvent.click(getByTitle('nextArrow'));

        expect(mockSetState).toHaveBeenNthCalledWith(
          4,
          expect.any(Function),
        );
      });
    });
  });
});
