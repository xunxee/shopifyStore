import { render } from '@testing-library/react';

import LoginFormContainer from './LoginFormContainer';

describe('LoginFormContainer', () => {
  it('renders the LoginFormContainer', () => {
    const { getByPlaceholderText } = render(<LoginFormContainer />);

    getByPlaceholderText('Email');
    getByPlaceholderText('Password');
  });
});
