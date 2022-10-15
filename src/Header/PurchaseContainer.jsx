import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

export default function PurchaseContainer() {
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
