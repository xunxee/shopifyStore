import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';

import HomePageContainer from './HomePageContainer';

const Wrapper = styled.div({
  flex: 1,
});

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  return (
    <Wrapper>
      <HomePageContainer handleClick={handleClick} />
    </Wrapper>
  );
}
