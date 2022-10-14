import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

export default function LogoContainer() {
  return (
    <>
      <FontAwesomeIcon icon={faChair} size="2x" color="red" />
      <div>Shopify Store</div>
    </>
  );
}
