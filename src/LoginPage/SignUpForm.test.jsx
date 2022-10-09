import { render, fireEvent } from '@testing-library/react';

import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  const handleClick = jest.fn();

  function renderLoginForm() {
    return render((
      <SignUpForm
        onClick={handleClick}
      />
    ));
  }

  it('renders the SignUpForm', () => {
    const { container } = renderLoginForm();

    expect(container).toHaveTextContent('Passwords must be longer than 7');
  });

  it('clicks Sing up button', () => {
    const { getByText } = renderLoginForm();

    fireEvent.click(getByText('Log In'));

    expect(handleClick).toBeCalled();
  });
});
