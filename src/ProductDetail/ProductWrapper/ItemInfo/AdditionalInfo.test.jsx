import { fireEvent, render } from '@testing-library/react';

import AdditionalInfo from './AdditionalInfo';

import PRODUCT_DETAIL from '../../../../fixtures/ProductDetail/productDetail';

const { care } = PRODUCT_DETAIL;

describe('AdditionalInfo', () => {
  const handleClick = jest.fn();

  function renderAdditionalInfo(
    {
      name = 'care',
      title = 'Care',
      isInfoOpen = false,
    } = {},
  ) {
    return render(
      <AdditionalInfo
        name={name}
        title={title}
        product={PRODUCT_DETAIL}
        isInfoOpen={isInfoOpen}
        onClickAdditionalInfo={handleClick}
      />,
    );
  }

  it('renders the title', () => {
    const { container } = renderAdditionalInfo();

    expect(container).toHaveTextContent('Care');
  });

  context('when you click on "Care" on the product detail page', () => {
    it('renders the info for "Care"', () => {
      const { getByText, container } = renderAdditionalInfo(
        { isInfoOpen: true },
      );

      expect(container).toHaveTextContent(care);

      fireEvent.click(getByText('Care'));

      expect(handleClick).toBeCalledWith('care');
    });
  });
});
