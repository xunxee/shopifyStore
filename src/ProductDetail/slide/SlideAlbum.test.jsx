import { render } from '@testing-library/react';

import SlideAlbum from './SlideAlbum';

describe('SlideAlbum', () => {
  it('renders the title', () => {
    const { container } = render((
      <SlideAlbum />
    ));

    expect(container).toHaveTextContent('SlideAlbum');
  });
});
