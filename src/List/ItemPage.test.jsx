import { render } from '@testing-library/react';

import ItemPage from './ItemPage';

describe('CategoryBar', () => {
  it('renders the title', () => {
    const { container } = render((
      <ItemPage />
    ));

    expect(container).toHaveTextContent('ItemPage');
  });
});
