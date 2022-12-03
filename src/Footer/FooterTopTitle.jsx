import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gridColumn: '1 / span 2',
  '& button': {
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    border: '0',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '& div': {
    marginLeft: '10px',
    fontSize: '20px',
  },
});

export default function FooterTopTitle() {
  return (
    <Container>
      <button
        type="button"
      >
        <FontAwesomeIcon
          icon={faChair}
          size="2x"
          color="#EAEAEA"
        />
        <div>Shopify</div>
      </button>
    </Container>
  );
}
