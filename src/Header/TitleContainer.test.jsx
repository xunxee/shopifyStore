import { render } from '@testing-library/react';

import TitleContainer from './TitleContainer';

describe('TitleContainer', () => {
  it('renders the title logo', () => {
    const { queryByTitle } = render(<TitleContainer />);

    expect(queryByTitle('chair'));
  });

  it('renders the title list', () => {
    const { container } = render(<TitleContainer />);

    expect(container).toHaveTextContent('New Arrivals');
  });
});
