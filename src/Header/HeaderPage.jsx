import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

export default function HeaderPage() {
  return (
    <>
      <FontAwesomeIcon icon={faChair} size="2x" color="red" />
      <div>Header!</div>
      <div>Logo</div>
    </>
  );
}
