import { render } from '@testing-library/react';

import FooterBottomContainer from './FooterBottomContainer';

describe('FooterBottomContainer', () => {
  it('renders the title', () => {
    const { container } = render((
      <FooterBottomContainer />
    ));

    expect(container).toHaveTextContent('2022');
  });
});
