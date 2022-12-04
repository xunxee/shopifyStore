import styled from '@emotion/styled';

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
      {[
        {
          column: 1,
          rowStart: 1,
          rowEnd: 2,
          title: 'Home',
        },
        {
          column: 1,
          rowStart: 2,
          rowEnd: 3,
          title: 'About',
        },
        {
          column: 1,
          rowStart: 3,
          rowEnd: 4,
          title: 'Terms of use',
        },
        {
          column: 1,
          rowStart: 4,
          rowEnd: 5,
          title: 'Shopping',
        },
        {
          column: 2,
          rowStart: 1,
          rowEnd: 2,
          title: 'Privacy Policy',
        },
      ].map((item) => (
        <Item
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
