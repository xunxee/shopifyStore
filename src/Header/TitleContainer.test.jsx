import { render } from '@testing-library/react';

import TitleContainer from './TitleContainer';

describe('TitleContainer', () => {
  it('renders the title logo', () => {
    const { queryByTitle } = render(<TitleContainer />);

    expect(queryByTitle('chair')).not.toBeNull();
  });

  it('renders the title list', () => {
    const { container } = render(<TitleContainer />);

    const texts = ['All', 'New Arrivals', 'Featured'];

    texts.forEach((text) => {
      expect(container).toHaveTextContent(text);
    });
  });
});
