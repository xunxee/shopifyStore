import { render } from '@testing-library/react';

import RelevanceBar from './RelevanceBar';

describe('CategoryBar', () => {
  it('renders the title', () => {
    const { container } = render((
      <RelevanceBar />
    ));

    expect(container).toHaveTextContent('Sort');
    expect(container).toHaveTextContent('Material');
  });
});
