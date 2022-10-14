import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

import TitleContainer from './TitleContainer';
import SearchBarContainer from './SearchBarContainer';

function PurchaseContainer() {
  return (
    <>
      <FontAwesomeIcon
        title="shoppingCart"
        icon={faCartShopping}
        size="2x"
        color="red"
      />
      <FontAwesomeIcon
        title="circleUser"
        icon={faCircleUser}
        size="2x"
        color="red"
      />
    </>
  );
}

export default function HeaderPage() {
  return (
    <>
      <button type="button">hello</button>
      <TitleContainer />
      <SearchBarContainer />
      <PurchaseContainer />
    </>
  );
}
