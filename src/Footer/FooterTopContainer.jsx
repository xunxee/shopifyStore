import styled from '@emotion/styled';

import FooterTopTitle from './FooterTopTitle';
import FooterTopList from './FooterTopList';
import FooterTopInfo from './FooterTopInfo';

const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  width: '90%',
  maxWidth: '1920px',
  margin: '0 auto',
  padding: '3rem 0',
});

export default function FooterTopContainer() {
  return (
    <Container>
      <FooterTopTitle />
      <FooterTopList />
      <FooterTopInfo />
    </Container>
  );
}
