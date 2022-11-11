import { render } from '@testing-library/react';

import LogoutPage from './LogoutPage';

jest.mock('react-redux');

describe('LogoutPage', () => {
  it('renders "Log out" button', () => {
    const { queryByText } = render((
      <LogoutPage />
    ));

    expect(queryByText('Log out')).not.toBeNull();
  });
});
