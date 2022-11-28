import { render } from '@testing-library/react';

import ListContainer from './ListContainer';

describe('ListContainer', () => {
  it('renders the title', () => {
    const { container } = render(<ListContainer />);

    expect(container).toHaveTextContent('All Categories');
  });
});
