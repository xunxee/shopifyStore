import styled from '@emotion/styled';
import HomePageContainer from './HomePageContainer';

const Wrapper = styled.div({
  flex: '1',
});

export default function HomePage() {
  return (
    <Wrapper>
      <div>HomePage</div>
      <HomePageContainer />
    </Wrapper>
  );
}
