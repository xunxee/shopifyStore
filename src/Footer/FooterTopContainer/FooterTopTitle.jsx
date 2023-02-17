import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gridColumn: '1 / span 2',
  '& button': {
    all: 'unset',
    display: 'flex',
    alignItems: 'center',
    color: '#FFF',
    cursor: 'pointer',
  },
  '& div': {
    marginLeft: '10px',
    fontSize: '20px',
  },
});

export default function FooterTopTitle() {
  return (
    <Wrapper>
      <button type="button">
        <FontAwesomeIcon icon={faChair} size="2x" color="#EAEAEA" />
        <div>Shopify</div>
      </button>
    </Wrapper>
  );
}
