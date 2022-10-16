import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
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
      <FontAwesomeIcon
        title="circleUser"
        icon={faCircleUser}
        size="2x"
        color="#EAEAEA"
        onClick={onClick}
      />
    </Container>
  );
}
