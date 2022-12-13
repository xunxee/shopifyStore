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

// useNavigate를 사용하자
// HeaderPage 처럼

// page에는 'react-router-dom'
// container에는 'react-redux'
