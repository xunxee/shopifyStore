import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import TitleBar from './TitleBar';

describe('TitleBar', () => {
  const handleClick = jest.fn();

  function renderTitleBar() {
    return render((
      <MemoryRouter>
        <TitleBar
          category="new"
          onClickCategories={handleClick}
        />
      </MemoryRouter>
    ));
  }

  it('renders the title logo', () => {
    const { queryByTitle } = renderTitleBar();

    expect(queryByTitle('chair')).not.toBeNull();
  });

  it('renders the title list', () => {
    const { container } = renderTitleBar();

    const texts = ['All', 'New Arrivals', 'Featured'];

    texts.forEach((text) => {
      expect(container).toHaveTextContent(text);
    });
  });
});
