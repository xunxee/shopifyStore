import { render } from '@testing-library/react';

import FOOTER_MENU_LIST from '../../../fixtures/Footer/footerMenuList';

import FooterTopList from './FooterTopList';

describe('FooterTopList', () => {
  it('renders the list', () => {
    const { container } = render(<FooterTopList />);

    expect(container).toHaveTextContent('Privacy Policy');

    FOOTER_MENU_LIST.map((item) => expect(container)
      .toHaveTextContent(item.title));
  });
});
