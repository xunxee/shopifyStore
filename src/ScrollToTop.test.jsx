import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  const scrollToMock = jest.fn();

  beforeAll(() => {
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
  });

  afterAll(() => {
    window.scrollTo.mockRestore();
  });

  function renderScrollToTop() {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>,
    );
  }

  it('scrolls to the top of the page upon page navigation', () => {
    renderScrollToTop();

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });
});
