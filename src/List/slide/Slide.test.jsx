import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Slide from './Slide';

import PRODUCT from '../../../fixtures/MockData/product';

describe('Slide', () => {
  jest.spyOn(React, 'useRef')
    .mockReturnValueOnce({ current: 'ul' });

  const handleClickPreviousButton = jest.fn();
  const handleClickNextButton = jest.fn();

  beforeEach(() => {
    handleClickPreviousButton.mockClear();
    handleClickNextButton.mockClear();
  });

  function renderSlide({
    banners = PRODUCT.banners,
    title = PRODUCT.title,
  } = {}) {
    return render((
      <Slide
        banners={banners}
        title={title}
        onClickPreviousButton={handleClickPreviousButton}
        onClickNextButton={handleClickNextButton}
      />
    ));
  }

  it('clicks previous button', () => {
    const { getByTitle } = renderSlide();

    fireEvent.click(getByTitle('previousArrow'));

    expect(handleClickPreviousButton).toBeCalled();
  });
});
