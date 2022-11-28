import styled from '@emotion/styled';

import ListContainer from './ListContainer';

const Container = styled.div({
  flex: '1',
  justifyContent: 'space-around',
  minWidth: '950px',
});

export default function ListPage() {
  return (
    <Container>
      <ListContainer />
    </Container>
  );
}
