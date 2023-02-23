import { render, fireEvent } from '@testing-library/react';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

import DetailOptionButton from './DetailOptionButton';

const { sizes, colors } = PRODUCT_DETAIL;

describe('DetailOptionButton', () => {
  const handleClick = jest.fn();

  function renderDetailOptionButton(
    { options = '', selectedOption = null } = {},
  ) {
    return render(
      <DetailOptionButton
        options={options}
        selectedOption={selectedOption}
        onClickOption={handleClick}
      />,
    );
  }

  context('when rendered for the first time', () => {
    it('renders the Button', () => {
      const { container } = renderDetailOptionButton(
        { options: sizes },
      );

      expect(container).toHaveTextContent('XL');
    });

    it('listens click event', () => {
      const { getByText } = renderDetailOptionButton(
        { options: sizes },
      );

      fireEvent.click(getByText('S'));
    });

    it('checked for the XS size', () => {
      renderDetailOptionButton(
        { options: sizes },
      );
    });
  });

  context('when click on the M size button', () => {
    it('checked for the M size', () => {
      renderDetailOptionButton(
        { options: sizes, selectedOption: 'M' },
      );
    });
  });

  context('when click on the white color button', () => {
    it('checked for the white color', () => {
      renderDetailOptionButton(
        { options: colors, selectedOption: 'white' },
      );
    });
  });
});
