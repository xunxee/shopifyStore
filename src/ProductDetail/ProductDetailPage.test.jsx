import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ProductDetailPage from './ProductDetailPage';

describe('ProductDetailPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      productDetail: {
        product: {
          id: 1,
          title: 'Special Edition T-Shirt',
          price: '$50.00 USD',
          imageList: [
            'https://user-images.githubusercontent.com/87808288/210361413-0df984fc-ba95-44b4-a3f8-5ad25ca69fa9.png',
            'https://user-images.githubusercontent.com/87808288/210361450-caec2f37-b159-417e-8e29-7841af4bb4f6.png',
            'https://user-images.githubusercontent.com/87808288/210361485-b0962306-1e80-4390-ac12-55b891900240.png',
            'https://user-images.githubusercontent.com/87808288/210361523-88a96ee5-b8c6-42a7-877d-135534e9afdc.png',
          ],
          size: ['S', 'M', 'L'],
          details: 'Show off your love for Next.js and Vercel with this unique, limited edition t-shirt. This design is part of a limited run, numbered drop at the June 2021 Next.js Conf. It features a unique, handcrafted triangle design. Get it while supplies last – only 200 of these shirts will be made! All proceeds will be donated to charity.',
        },
      },
    }));
  });

  it('renders product name', () => {
    const params = { id: '1' };

    const { container } = render((
      <ProductDetailPage params={params} />
    ));

    expect(container).toHaveTextContent(
      'Special Edition T-Shirt',
    );
  });
});