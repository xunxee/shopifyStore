import { render } from '@testing-library/react';

import HomePage from './HomePage';

describe('Homepage', () => {
  it('renders the LoginFormContainer', () => {
    const { container } = render(<HomePage />);

    expect(container).toHaveTextContent('HomePage');
  });
});
