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
          id: 1,
          column: 1,
          rowStart: 1,
          rowEnd: 2,
          title: 'Home',
        },
        {
          id: 2,
          column: 1,
          rowStart: 2,
          rowEnd: 3,
          title: 'About',
        },
        {
          id: 3,
          column: 1,
          rowStart: 3,
          rowEnd: 4,
          title: 'Terms of use',
        },
        {
          id: 4,
          column: 1,
          rowStart: 4,
          rowEnd: 5,
          title: 'Shopping',
        },
        {
          id: 5,
          column: 2,
          rowStart: 1,
          rowEnd: 2,
          title: 'Privacy Policy',
        },
      ].map((item) => (
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
