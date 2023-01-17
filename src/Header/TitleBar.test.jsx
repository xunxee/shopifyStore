import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import TitleBar from './TitleBar';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

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
    const { getByText } = renderTitleBar();

    expect(getByText('chair')).not.toBeNull();
  });

  it('renders the title list', () => {
    const { container } = renderTitleBar();

    LIST_CATEGORIES.headerCategories
      .forEach(({ title }) => {
        expect(container).toHaveTextContent(title);
      });
  });
});
