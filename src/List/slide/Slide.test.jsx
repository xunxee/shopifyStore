import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Slide from './Slide';

import PRODUCT from '../../../fixtures/MockData/product';

describe('Slide', () => {
  jest.spyOn(React, 'useRef')
    .mockReturnValueOnce({ current: 'ul' });

  const goToMainEndSlide = jest.fn();
  const goToPreviousBanner = jest.fn();

  const goToMainStartSlide = jest.fn();
  const goToNextBanner = jest.fn();

  beforeEach(() => {
    goToMainEndSlide.mockClear();
    goToPreviousBanner.mockClear();
    goToMainStartSlide.mockClear();
    goToNextBanner.mockClear();
  });

  function renderSlide({
    banners = PRODUCT.banners,
    title = PRODUCT.title,
    isPassTheFirstSlide = false,
    isPassTheLastSlide = false,
  } = {}) {
    return render((
      <Slide
        banners={banners}
        title={title}
        isPassTheFirstSlide={isPassTheFirstSlide}
        goToMainEndSlide={goToMainEndSlide}
        goToPreviousBanner={goToPreviousBanner}
        isPassTheLastSlide={isPassTheLastSlide}
        goToMainStartSlide={goToMainStartSlide}
        goToNextBanner={goToNextBanner}
      />
    ));
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

        expect(goToNextBanner).toBeCalled();
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

        expect(goToPreviousBanner).toBeCalled();
      });
    });
  });
});
