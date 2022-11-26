import styled from '@emotion/styled';

import FooterTopContainer from './FooterTopContainer';
import FooterBottomContainer from './FooterBottomContainer';

const Container = styled.div({
  width: '100%',
  minWidth: '950px',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  borderTop: '1px solid #999999',
  color: '#EAEAEA',
  backgroundColor: '#000000',
});

export default function FooterPage() {
  return (
    <Container>
      <FooterTopContainer />
      <FooterBottomContainer />
    </Container>
  );
}
