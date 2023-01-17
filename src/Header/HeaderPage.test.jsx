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

  beforeEach((() => {
    dispatch.mockClear();
    mockUsedNavigate.mockClear();

    useSelector.mockImplementation((selector) => selector({
      membership: {
        refreshToken: '',
      },
    }));
  }));

  useDispatch.mockImplementation(() => dispatch);

  function renderHeaderPage() {
    return render((
      <MemoryRouter>
        <HeaderPage />
      </MemoryRouter>
    ));
  }

  it('renders the Title bar', () => {
    const { getByText } = renderHeaderPage();

    fireEvent.click(getByText('New Arrivals'));

    expect(mockUsedNavigate).toBeCalled();
  });
});
