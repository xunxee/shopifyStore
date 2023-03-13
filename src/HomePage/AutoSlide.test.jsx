import { render } from '@testing-library/react';

import AutoSlide from './AutoSlide';

describe('AutoSlide', () => {
  function renderAutoSlide() {
    return render(<AutoSlide />);
  }

  it('renders the title', () => {
    const { container } = renderAutoSlide();

    expect(container).toHaveTextContent('AutoSlide');
  });
});
