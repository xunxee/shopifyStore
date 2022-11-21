import styled from '@emotion/styled';

import LogoContainer from './LogoContainer';

const Container = styled.div({
  zIndex: '2',
});

export default function FooterPage() {
  return (
    <Container>
      <div>footer</div>
      <LogoContainer />
    </Container>
  );
}
