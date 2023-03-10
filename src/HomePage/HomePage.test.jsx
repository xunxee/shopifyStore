import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import HomePage from './HomePage';

jest.mock('react-redux');

const dispatch = jest.fn();

describe('Homepage', () => {
  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders the home page', () => {
    const { container } = render(
      <HomePage />,
    );

    expect(container).toHaveTextContent('HomePage');
  });
});
