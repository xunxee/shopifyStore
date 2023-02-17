import styled from '@emotion/styled';

import FooterTopContainer from './FooterTopContainer';
import FooterBottomLayout from './FooterBottomLayout';

const Wrapper = styled.div({
  width: '100%',
  minWidth: '990px',
  borderTop: '1px solid #999',
  color: '#EAEAEA',
  backgroundColor: '#000',
});

export default function FooterPage() {
  return (
    <Wrapper>
      <FooterTopContainer />
      <FooterBottomLayout />
    </Wrapper>
  );
}
