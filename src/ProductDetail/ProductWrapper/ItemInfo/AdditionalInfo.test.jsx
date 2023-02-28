import { render } from '@testing-library/react';

import AdditionalInfo from './AdditionalInfo';

describe('AdditionalInfo', () => {
  it('renders the title', () => {
    const { container } = render(<AdditionalInfo />);

    expect(container).toHaveTextContent('AdditionalInfo');
  });
});
