import { fireEvent, render } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import HeaderPage from './HeaderPage';

jest.mock('react-redux');

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate() {
    return mockUsedNavigate;
  },
}));

describe('HeaderPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockUsedNavigate.mockClear();

    useSelector.mockImplementation((selector) => selector({
      membership: {
        refreshToken: '',
      },
      header: {
        searchBarFields: {
          value: given.value,
        },
      },
    }));
  });

  useDispatch.mockImplementation(() => dispatch);

  function renderHeaderPage() {
    return render(
      <MemoryRouter>
        <HeaderPage />
      </MemoryRouter>,
    );
  }

  it('renders the title bar', () => {
    const { getByText } = renderHeaderPage();

    fireEvent.click(getByText('New Arrivals'));

    expect(mockUsedNavigate).toBeCalled();
  });

  describe('handleKeyDown', () => {
    context('when the Enter key is pressed', () => {
      given('value', () => 'test');

      it('updates the URL address with the content of the search bar', () => {
        const { getByPlaceholderText } = renderHeaderPage();

        fireEvent.keyDown(getByPlaceholderText('Search for products...'), {
          code: 'Enter',
        });

        expect(mockUsedNavigate).toBeCalledWith('/search?q=test');
      });
    });
  });
});
