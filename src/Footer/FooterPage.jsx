import styled from '@emotion/styled';

import FooterTopContainer from './FooterTopLayout';
import FooterBottomLayout from './FooterBottomLayout';

const Container = styled.div({
  width: '100%',
  minWidth: '950px',
  borderTop: '1px solid #999',
  color: '#EAEAEA',
  backgroundColor: '#000',
});

export default function FooterPage() {
  return (
    <Container>
      <FooterTopContainer />
      <FooterBottomLayout />
    </Container>
  );
}
