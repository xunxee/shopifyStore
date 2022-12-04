import styled from '@emotion/styled';

import ListContainer from './ListContainer';

const Container = styled.div({
  width: '100%',
});

export default function ListPage() {
  return (
    <Container>
      <ListContainer />
    </Container>
  );
}
