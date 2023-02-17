import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '90%',
  maxWidth: '1920px',
  height: '100px',
  margin: '0 auto',
  borderTop: '1px solid #999',
  paddingTop: '1.5rem',
  paddingBottom: '2.5rem',
});

const RightsReserved = styled.div({
  color: '#999',
});

const Creator = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  color: '#FFF',
  '& span': {
    paddingRight: '5px',
  },
  '& button': {
    fontSize: '16px',
    color: '#FFF',
    border: '0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
});

export default function FooterBottomLayout() {
  return (
    <Container>
      <RightsReserved>
        <span>© 2022 gunhee Store, Inc. All rights reserved.</span>
      </RightsReserved>
      <Creator>
        <span>Created by</span>
        <div>
          <FontAwesomeIcon
            title="chair"
            icon={faChair}
            size="lg"
            color="#EAEAEA"
          />
          <button type="button">gunhee</button>
        </div>
      </Creator>
    </Container>
  );
}
