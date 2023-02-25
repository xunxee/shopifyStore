import { render, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

import DetailOptionButton from './DetailOptionButton';

const {
  sizes,
  colors,
} = PRODUCT_DETAIL;

describe('DetailOptionButton', () => {
  const dispatch = jest.fn();

  const handleClick = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  function renderDetailOptionButton(
    {
      name = '',
      options = '',
      selectedOption = '',
    } = {},
  ) {
    return render(
      <DetailOptionButton
        name={name}
        options={options}
        selectedOption={selectedOption}
        onClickOption={handleClick}
      />,
    );
  }

  context('when rendered for the first time', () => {
    it('renders the Button', () => {
      const { container } = renderDetailOptionButton(
        {
          name: 'size',
          options: sizes,
        },
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

    it('checked for the white button', () => {
      renderDetailOptionButton(
        {
          name: 'color',
          options: colors,
          selectedOption: 'white',
        },
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
