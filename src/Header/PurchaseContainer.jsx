import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  flexBasis: '33%',
  '& button': {
    backgroundColor: 'transparent',
    border: '0',
    outline: '0',
  },
});

export default function PurchaseContainer({ onClick }) {
  return (
    <Container>
      <FontAwesomeIcon
        title="shoppingCart"
        icon={faCartShopping}
        size="2x"
        color="#EAEAEA"
      />
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
