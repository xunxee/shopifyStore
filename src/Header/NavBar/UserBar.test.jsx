import { render } from '@testing-library/react';

import UserBar from './UserBar';

describe('UserBar', () => {
  it('renders the icons', () => {
    const { getByText } = render(<UserBar />);

    const titles = ['shoppingCart', 'circleUser'];

    titles.forEach((title) => {
      expect(getByText(title)).not.toBeNull();
    });
  });
});
