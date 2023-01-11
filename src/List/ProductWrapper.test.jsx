import { fireEvent, render } from '@testing-library/react';

import ProductWrapper from './ProductWrapper';

import PRODUCT from '../../fixtures/MockData/product';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => ['', mockSetState],
}));

describe('ProductWrapper', () => {
  beforeEach(() => {
    mockSetState.mockClear();
  });

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

    expect(getByTitle('leftArrow')).not.toBeNull();
  });

  context('when the arrow button is clicked', () => {
    it('executes the handleClickLeftButton function', () => {
      const { getByTitle } = render((
        <ProductWrapper product={PRODUCT} />
      ));

      fireEvent.click(getByTitle('rightArrow'));

      expect(mockSetState).toHaveBeenNthCalledWith(1, '1');
    });

    it('executes the handleClickLeftButton function', () => {
      const { getByTitle } = render((
        <ProductWrapper product={PRODUCT} />
      ));

      fireEvent.click(getByTitle('leftArrow'));

      expect(mockSetState).toHaveBeenNthCalledWith(1, -1);
    });
  });
});
