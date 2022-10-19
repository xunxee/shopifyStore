import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  flexBasis: '33%',
  '& button': {
    marginLeft: '20px',
    border: '0',
    outline: '0',
    backgroundColor: 'transparent',
  },
});

export default function PurchaseContainer({
  onClick,
  refUserIcon,
}) {
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
        ref={refUserIcon}
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
