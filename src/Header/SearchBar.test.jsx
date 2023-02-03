import { render, fireEvent } from '@testing-library/react';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const handleChange = jest.fn();
  const handleKeyDown = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleKeyDown.mockClear();
  });

  function renderSearchBar() {
    return render((
      <SearchBar
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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

  describe('handleKeyDown', () => {
    context('when enter the Enter key', () => {
      it('transfers value to the onPressEnterKey function', () => {
        const { getByPlaceholderText } = renderSearchBar();

        fireEvent.keyDown(getByPlaceholderText(
          'Search for products...',
        ), { code: 'Enter' });

        expect(handleKeyDown).toBeCalled();
      });
    });
  });
});
