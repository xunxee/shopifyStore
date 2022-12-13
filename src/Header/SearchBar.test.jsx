import { render } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders the search bar of the input tag', () => {
    const { queryByPlaceholderText } = render(
      <SearchBar />,
    );

    expect(queryByPlaceholderText(
      'Search for products...',
    )).not.toBeNull();
  });

  it('renders the Magnifying Glass icon', () => {
    const { queryByTitle } = render(<SearchBar />);

    expect(queryByTitle('magnifyingGlass')).not.toBeNull();
  });
});
