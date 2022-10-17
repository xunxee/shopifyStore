import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  flexBasis: '33%',
});

const ListContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  '& li': {
    color: '#888888',
    marginLeft: '24px',
    fontSize: '18px',
  },
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
