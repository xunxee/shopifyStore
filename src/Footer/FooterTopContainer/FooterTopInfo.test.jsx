import { render } from '@testing-library/react';

import FooterTopInfo from './FooterTopInfo';

describe('FooterTopInfo', () => {
  it('renders the Info', () => {
    const { container } = render(<FooterTopInfo />);

    expect(container).toHaveTextContent('GitHub');
  });
});
