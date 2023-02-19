import { render } from '@testing-library/react';

import FooterTopList from './FooterTopList';

import FOOTER_MENU_LIST from '@fixtures/Footer/footerMenuList';

describe('FooterTopList', () => {
  it('renders the list', () => {
    const { container } = render(<FooterTopList />);

    expect(container).toHaveTextContent('Privacy Policy');

    FOOTER_MENU_LIST.map((item) => expect(container)
      .toHaveTextContent(item.title));
  });
});
