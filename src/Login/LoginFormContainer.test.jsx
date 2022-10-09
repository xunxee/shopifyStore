import { render } from '@testing-library/react';

import LoginFormContainer from './LoginFormContainer';

describe('LoginFormContainer', () => {
  it('renders the LoginFormContainer', () => {
    const { queryByPlaceholderText } = render((
      <LoginFormContainer />
    ));

    expect(queryByPlaceholderText('Email')).not.toBeNull();
    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });
});
