import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  '& button': {
    marginLeft: '20px',
    border: '0',
    outline: '0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
});

export default function PurchaseContainer({ onClick }) {
  return (
    <Container>
      <button
        type="button"
      >
        <FontAwesomeIcon
          title="shoppingCart"
          icon={faCartShopping}
          size="2x"
          color="#EAEAEA"
        />
      </button>
      <button
        type="button"
        onClick={onClick}
      >
        <FontAwesomeIcon
          title="circleUser"
          icon={faCircleUser}
          size="2x"
          color="#EAEAEA"
        />
      </button>
    </Container>
  );
}
