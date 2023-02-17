import { render } from '@testing-library/react';

import FooterBottomLayout from './FooterBottomLayout';

describe('FooterBottomContainer', () => {
  it('renders the title', () => {
    const { container } = render(<FooterBottomLayout />);

    expect(container).toHaveTextContent('2022');
  });

  it('renders the chair icon', () => {
    const { getByTitle } = render(<FooterBottomLayout />);

    expect(getByTitle('chair')).not.toBeNull();
  });
});
