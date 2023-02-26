import { render } from '@testing-library/react';

import AddCartButton from './AddCartButton';

describe('AddCartButton', () => {
  it('renders the title', () => {
    const { container } = render(<AddCartButton />);

    expect(container).toHaveTextContent('AddCartButton');
  });
});
