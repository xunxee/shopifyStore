import { render } from '@testing-library/react';

import CategoryBar from './CategoryBar';

describe('CategoryBar', () => {
  it('renders the title', () => {
    const { container } = render((
      <CategoryBar />
    ));

    expect(container).toHaveTextContent('All Categories');
  });
});
