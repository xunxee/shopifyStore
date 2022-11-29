import styled from '@emotion/styled';

import ListContainer from './ListContainer';

const Container = styled.div({
  justifyContent: 'space-around',
  minWidth: '950px',
  backgroundColor: '#000',
});

export default function ListPage() {
  return (
    <Container>
      <ListContainer />
    </Container>
  );
}
