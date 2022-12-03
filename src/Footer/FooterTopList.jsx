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
  '& button': {
    padding: '0',
    paddingBottom: '1.5rem',
    border: '0',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}));

export default function FooterTopList() {
  return (
    <Container>
      <Item
        column={1}
        rowStart={1}
        rowEnd={2}
      >
        <button type="button">Home</button>
      </Item>
      <Item
        column={1}
        rowStart={2}
        rowEnd={3}
      >
        <button type="button">About</button>
      </Item>
      <Item
        column={1}
        rowStart={3}
        rowEnd={4}
      >
        <button type="button">Terms of use</button>
      </Item>
      <Item
        column={1}
        rowStart={4}
        rowEnd={5}
      >
        <button type="button">Shopping</button>
      </Item>
      <Item
        column={2}
        rowStart={1}
        rowEnd={2}
      >
        <button type="button">Privacy Policy</button>
      </Item>
    </Container>
  );
}
