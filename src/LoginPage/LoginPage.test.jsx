import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import LoginPage from './LoginPage';

jest.mock('react-redux');

describe('LoginPage', () => {
  useSelector.mockImplementation((selector) => selector({
    login: {
      isLogin: true,
    },
  }));

  it('renders the LoginFormContainer', () => {
    const { container } = render(<LoginPage />);

    expect(container).toHaveTextContent('X');
  });
});
