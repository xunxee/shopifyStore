import styled from '@emotion/styled';

const Container = styled.div({
  flexBasis: '33%',
  backgroundColor: 'green',
  '& input': {
    width: '100%',
    height: '40px',
    border: '1px solid #333333',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontSize: '15px',
    paddingLeft: '15px',
  },
  '& input:focus': {
    outline: 'none',
  },
});

export default function SearchBarContainer() {
  return (
    <Container>
      <input
        type="text"
        placeholder="Search for products..."
      />
    </Container>
  );
}
