import { render } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the NotFoundPage', () => {
    const { container } = render(<NotFoundPage />);

    expect(container).toHaveTextContent('Not Found Page!');
  });
});
