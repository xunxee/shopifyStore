import { render, fireEvent } from '@testing-library/react';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

import DetailOptionButton from './DetailOptionButton';

const { sizes } = PRODUCT_DETAIL;

describe('DetailOptionButton', () => {
  const handleClick = jest.fn();

  function renderDetailOptionButton() {
    return render(
      <DetailOptionButton
        options={sizes}
        onClickSize={handleClick}
      />,
    );
  }

  it('renders the Button', () => {
    const { container } = renderDetailOptionButton();

    expect(container).toHaveTextContent('XL');
  });

  it('listens click event', () => {
    const { getByText } = renderDetailOptionButton();

    fireEvent.click(getByText('S'));
  });
});
