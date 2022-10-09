import { render } from '@testing-library/react';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders the LoginFormContainer', () => {
    const { container } = render(<LoginPage />);

    expect(container).toHaveTextContent("Don't have an account?");
  });
});
