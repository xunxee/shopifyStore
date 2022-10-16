import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
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
      <ul>
        <li>All</li>
        <li>New Arrivals</li>
        <li>Featured</li>
      </ul>
    </Container>
  );
}
