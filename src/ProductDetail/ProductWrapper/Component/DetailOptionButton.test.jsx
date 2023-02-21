import { render, fireEvent } from '@testing-library/react';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

import DetailOptionButton from './DetailOptionButton';

const { sizes } = PRODUCT_DETAIL;

describe('DetailOptionButton', () => {
  const handleClick = jest.fn();

  function renderDetailOptionButton(
    { selectedSize = null } = {},
  ) {
    return render(
      <DetailOptionButton
        options={sizes}
        selectedSize={selectedSize}
        onClickSize={handleClick}
      />,
    );
  }

  context('when rendered for the first time', () => {
    it('checked for the XS size', () => {
      renderDetailOptionButton();
    });
  });

  context('when click on the M size button', () => {
    it('checked for the M size', () => {
      renderDetailOptionButton(
        { selectedSize: 'M' },
      );
    });
  });

  it('renders the Button', () => {
    const { container } = renderDetailOptionButton();

    expect(container).toHaveTextContent('XL');
  });

  it('listens click event', () => {
    const { getByText } = renderDetailOptionButton();

    fireEvent.click(getByText('S'));
  });
});
