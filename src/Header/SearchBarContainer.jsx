import styled from '@emotion/styled';

const Container = styled.div({
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
