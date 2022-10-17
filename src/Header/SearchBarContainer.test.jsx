import { render } from '@testing-library/react';

import SearchBarContainer from './SearchBarContainer';

describe('SearchBarContainer', () => {
  it('renders the search bar of the input tag', () => {
    const { queryByPlaceholderText } = render(
      <SearchBarContainer />,
    );

    expect(queryByPlaceholderText(
      'Search for products...',
    )).not.toBeNull();
  });

  it('renders the Magnifying Glass icon', () => {
    const { queryByTitle } = render(<SearchBarContainer />);

    expect(queryByTitle('magnifyingGlass')).not.toBeNull();
  });
});
