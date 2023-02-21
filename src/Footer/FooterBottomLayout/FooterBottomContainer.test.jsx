import { render } from '@testing-library/react';

import FooterBottomContainer from './FooterBottomContainer';

describe('FooterBottomContainer', () => {
  it('renders the title', () => {
    const { container } = render(<FooterBottomContainer />);

    expect(container).toHaveTextContent('2022');
  });

  it('renders the chair icon', () => {
    const { getByTitle } = render(<FooterBottomContainer />);

    expect(getByTitle('chair')).not.toBeNull();
  });
});
