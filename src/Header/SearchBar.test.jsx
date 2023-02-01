import { render, fireEvent } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  function renderSearchBar() {
    return render((
      <SearchBar
        onChange={handleChange}
      />
    ));
  }

  it('renders the search bar of the input tag', () => {
    const { queryByPlaceholderText } = renderSearchBar();

    expect(queryByPlaceholderText(
      'Search for products...',
    )).not.toBeNull();
  });

  it('renders the Magnifying Glass icon', () => {
    const { queryByTitle } = render(<SearchBar />);

    expect(queryByTitle('magnifyingGlass')).not.toBeNull();
  });

  describe('handleChange', () => {
    context('when enter product information', () => {
      it('listens change events for "search bar"', () => {
        const { getByPlaceholderText } = renderSearchBar();

        fireEvent.change(getByPlaceholderText(
          'Search for products...',
        ), {
          target: { value: 'bed' },
        });

        expect(handleChange).toBeCalledWith({
          value: 'bed',
        });
      });
    });
  });
});
