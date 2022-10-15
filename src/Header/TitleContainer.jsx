import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

export default function TitleContainer() {
  return (
    <>
      <FontAwesomeIcon
        title="chair"
        icon={faChair}
        size="2x"
        color="red"
      />
      <ul>
        <li>All</li>
        <li>New Arrivals</li>
        <li>Featured</li>
      </ul>
    </>
  );
}
