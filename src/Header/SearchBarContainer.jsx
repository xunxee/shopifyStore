import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  position: 'relative',
  width: '100%',
  margin: '0',
  '& input': {
    width: '100%',
    height: '40px',
    border: '1px solid #333',
    backgroundColor: '#000',
    color: '#FFF',
    fontSize: '15px',
    paddingLeft: '15px',
  },
  '& input:focus': {
    outline: 'none',
  },
  '& > div': {
    position: 'absolute',
    left: '92%',
    bottom: '20%',
  },
});

export default function SearchBarContainer() {
  return (
    <Container>
      <input
        type="text"
        placeholder="Search for products..."
      />
      <div>
        <FontAwesomeIcon
          title="magnifyingGlass"
          icon={faMagnifyingGlass}
          size="1x"
        />
      </div>
    </Container>
  );
}
