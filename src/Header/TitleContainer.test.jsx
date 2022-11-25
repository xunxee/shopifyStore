import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import TitleContainer from './TitleContainer';

describe('TitleContainer', () => {
  function renderTitleContainer() {
    return render((
      <MemoryRouter>
        <TitleContainer />
      </MemoryRouter>
    ));
  }

  it('renders the title logo', () => {
    const { queryByTitle } = renderTitleContainer();

    expect(queryByTitle('chair')).not.toBeNull();
  });

  it('renders the title list', () => {
    const { container } = renderTitleContainer();

    const texts = ['All', 'New Arrivals', 'Featured'];

    texts.forEach((text) => {
      expect(container).toHaveTextContent(text);
    });
  });
});
