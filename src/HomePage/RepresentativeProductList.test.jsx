import { render } from '@testing-library/react';

import RepresentativeProductList from './RepresentativeProductList';

describe('RepresentativeProductList', () => {
  function renderRepresentativeProductList() {
    return render(<RepresentativeProductList />);
  }

  it('renders the title', () => {
    const { container } = renderRepresentativeProductList();

    expect(container).toHaveTextContent('RepresentativeProductList');
  });
});
