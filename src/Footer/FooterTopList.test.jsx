import { render } from '@testing-library/react';

import FooterTopList from './FooterTopList';

describe('FooterTopList', () => {
  it('renders the list', () => {
    const { container } = render(<FooterTopList />);

    expect(container).toHaveTextContent('Privacy Policy');
  });
});
