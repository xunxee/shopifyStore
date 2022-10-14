import { render } from '@testing-library/react';

import HeaderPage from './HeaderPage';

describe('HeaderPage', () => {
  it('renders the title', () => {
    const { container } = render((
      <HeaderPage />
    ));

    expect(container).toHaveTextContent('Header!');
  });
});
