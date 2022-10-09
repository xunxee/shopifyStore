import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders Test', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('Test');
  });
});
