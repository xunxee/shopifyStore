import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ProductWrapper from './ProductWrapper';

import PRODUCT_DETAIL from '../../../fixtures/ProductDetail/productDetail';

const {
  title,
  price,
  imageList,
  sizes,
  colors,
  details,
  evaluation,
  banners,
} = PRODUCT_DETAIL;

describe('ProductWrapper', () => {
  const setState = jest.fn();

  jest
    .spyOn(React, 'useState')
    .mockImplementation((initialState) => [initialState, setState]);

  beforeEach(() => {
    setState.mockClear();
  });

  function renderProductWrapper({
    isPassTheSlide = false,
    startNumber = 4,
    endNumber = 8,
  } = {}) {
    return render(
      <ProductWrapper
        product={{
          title,
          price,
          imageList,
          sizes,
          colors,
          details,
          evaluation,
        }}
        isPassTheSlide={isPassTheSlide}
        startNumber={startNumber}
        endNumber={endNumber}
        banners={banners}
      />,
    );
  }

  it('renders the title', () => {
    const { container } = renderProductWrapper();

    expect(container).toHaveTextContent(title);
  });

  it('renders the arrow icon', () => {
    const { getByTitle } = renderProductWrapper();

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

        expect(setState).toBeCalledTimes(2);

        jest.runAllTimers();

        jest.useRealTimers();
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

        expect(setState).toHaveBeenNthCalledWith(2, {
          isMotion: false,
          number: 4,
        });

        jest.runAllTimers();

        jest.useRealTimers();
      });
    });
  });
});
