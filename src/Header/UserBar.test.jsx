import { render } from '@testing-library/react';

import UserBar from './UserBar';

describe('UserBar', () => {
  it('renders the icons', () => {
    const { queryByTitle } = render(<UserBar />);

    const titles = ['shoppingCart', 'circleUser'];

    titles.forEach((title) => {
      expect(queryByTitle(title)).not.toBeNull();
    });
  });
});
