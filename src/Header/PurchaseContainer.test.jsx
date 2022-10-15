import { render } from '@testing-library/react';

import PurchaseContainer from './PurchaseContainer';

describe('PurchaseContainer', () => {
  it('renders the icons', () => {
    const { queryByTitle } = render(<PurchaseContainer />);

    const titles = ['shoppingCart', 'circleUser'];

    titles.forEach((title) => {
      expect(queryByTitle(title)).not.toBeNull();
    });
  });
});
