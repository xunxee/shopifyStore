import styled from '@emotion/styled';

const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(4, 1fr)',
  gridColumn: '3 / span 8',
});

function makeGrid(column, rowStart, rowEnd) {
  return ({
    gridColumn: `${column} / span 1`,
    gridRow: `${rowStart} / ${rowEnd}`,
  });
}

function makeItem() {
  return {
    padding: '0',
    paddingBottom: '1.5rem',
    border: '0',
    fontSize: '16px',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  };
}

const Item1 = styled.div({
  ...makeGrid(1, 1, 2),
  '& button': {
    ...makeItem(),
  },
});

const Item2 = styled.div({
  ...makeGrid(1, 2, 3),
  '& button': {
    ...makeItem(),
  },
});

const Item3 = styled.div({
  ...makeGrid(1, 3, 4),
  '& button': {
    ...makeItem(),
  },
});

const Item4 = styled.div({
  ...makeGrid(1, 4, 5),
  '& button': {
    ...makeItem(),
  },
});

const Item5 = styled.div({
  ...makeGrid(2, 1, 2),
  '& button': {
    ...makeItem(),
  },
});

export default function FooterTopList() {
  return (
    <Container>
      <Item1>
        <button type="button">Home</button>
      </Item1>
      <Item2>
        <button type="button">About</button>
      </Item2>
      <Item3>
        <button type="button">Terms of use</button>
      </Item3>
      <Item4>
        <button type="button">Shopping</button>
      </Item4>
      <Item5>
        <button type="button">Privacy Policy</button>
      </Item5>
    </Container>
  );
}
