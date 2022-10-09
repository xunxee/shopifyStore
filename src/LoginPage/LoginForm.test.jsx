import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleClick = jest.fn();

  function renderLoginForm() {
    return render((
      <LoginForm
        onClick={handleClick}
      />
    ));
  }

  it('renders the LoginForm', () => {
    const { container } = renderLoginForm();

    expect(container).toHaveTextContent('have an account?');
  });

  it('clicks Sing up button', () => {
    const { getByText } = renderLoginForm();

    fireEvent.click(getByText('Sign Up'));

    expect(handleClick).toBeCalled();
  });
});
