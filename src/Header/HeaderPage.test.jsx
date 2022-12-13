import { render, fireEvent } from '@testing-library/react';

import { useDispatch } from 'react-redux';

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
    const { container } = renderHeaderPage();

    expect(container).toHaveTextContent('New Arrivals');
  });

  it('clicks New Arrivals', () => {
    const { getByText } = renderHeaderPage();

    fireEvent.click(getByText('All'));

    expect(mockUsedNavigate).toBeCalledWith(
      '/search',
    );
  });
});
