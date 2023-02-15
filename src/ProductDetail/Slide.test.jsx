import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Slide from './Slide';

import PRODUCT_DETAIL from '../../fixtures/ProductDetail/productDetail';

const { banners, title } = PRODUCT_DETAIL;

describe('Slide', () => {
  jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: 'ul' });

  const goToMainEndSlide = jest.fn();
  const goToMainStartSlide = jest.fn();
  const goToBanner = jest.fn();

  beforeEach(() => {
    goToMainEndSlide.mockClear();
    goToMainStartSlide.mockClear();
    goToBanner.mockClear();
  });

  function renderSlide({
    isPassTheFirstSlide = false,
    isPassTheLastSlide = false,
  } = {}) {
    return render(
      <Slide
        banners={banners}
        title={title}
        isPassTheFirstSlide={isPassTheFirstSlide}
        goToMainEndSlide={goToMainEndSlide}
        isPassTheLastSlide={isPassTheLastSlide}
        goToMainStartSlide={goToMainStartSlide}
        goToBanner={goToBanner}
      />,
    );
  }

  describe('click the next button', () => {
    context('when reaches the next slide', () => {
      it('moves to the main slide', () => {
        const { getByTitle } = renderSlide({
          isPassTheLastSlide: true,
        });

        fireEvent.click(getByTitle('nextArrow'));

        expect(goToMainStartSlide).toBeCalled();
      });
    });

    context("when doesn't reach the next slide", () => {
      it('moves to the next banner', () => {
        const { getByTitle } = renderSlide({
          isPassTheLastSlide: false,
        });

        fireEvent.click(getByTitle('nextArrow'));

        expect(goToBanner).toBeCalled();
      });
    });
  });

  describe('click the previous button', () => {
    context('when reaches the previous slide', () => {
      it('moves to the main slide', () => {
        const { getByTitle } = renderSlide({
          isPassTheFirstSlide: true,
        });

        fireEvent.click(getByTitle('previousArrow'));

        expect(goToMainEndSlide).toBeCalled();
      });
    });

    context("when doesn't reach the previous slide", () => {
      it('moves to the previous banner', () => {
        const { getByTitle } = renderSlide();

        fireEvent.click(getByTitle('previousArrow'));

        expect(goToBanner).toBeCalled();
      });
    });
  });
});
