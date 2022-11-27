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
  marginRight: 'auto',
  marginLeft: 'auto',
  borderTop: '1px solid #999999',
  paddingTop: '1.5rem',
  paddingBottom: '2.5rem',
});

const RightsReserved = styled.div({
  color: '#999999',
});

const Creator = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  color: '#FFFFFF',
  '& span': {
    paddingRight: '5px',
  },
  '& button': {
    fontSize: '16px',
    color: '#FFFFFF',
    border: '0',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
});

export default function FooterBottomContainer() {
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
          <button type="button">
            gunhee
          </button>
        </div>
      </Creator>
    </Container>
  );
}
