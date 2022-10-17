import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  flexBasis: '33%',
  backgroundColor: 'blue',
});

const ListContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
});

export default function TitleContainer() {
  return (
    <Container>
      <FontAwesomeIcon
        title="chair"
        icon={faChair}
        size="2x"
        color="#EAEAEA"
      />
      <ListContainer>
        <li>All</li>
        <li>New Arrivals</li>
        <li>Featured</li>
      </ListContainer>
    </Container>
  );
}
