import styled from '@emotion/styled';

import FOOTER_MENU_LIST from '../../fixtures/footerMenuList';

const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gridColumn: '3 / span 8',
});

const Item = styled.div(({ column, rowStart, rowEnd }) => ({
  gridColumn: `${column} / span 1`,
  gridRow: `${rowStart} / ${rowEnd}`,
  paddingBottom: '2rem',
  '& button': {
    all: 'unset',
    fontSize: '16px',
    color: '#FFF',
    cursor: 'pointer',
  },
}));

export default function FooterTopList() {
  return (
    <Container>
      {FOOTER_MENU_LIST.map((item) => (
        <Item
          key={item.id}
          column={item.column}
          rowStart={item.rowStart}
          rowEnd={item.rowEnd}
        >
          <button type="button">
            {item.title}
          </button>
        </Item>
      ))}
    </Container>
  );
}
