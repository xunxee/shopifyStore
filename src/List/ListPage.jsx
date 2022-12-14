import styled from '@emotion/styled';

import { useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import ListContainer from './ListContainer';

const Container = styled.div({
  width: '100%',
});

export default function ListPage() {
  const navigate = useNavigate();

  const { pathname, search } = useLocation();

  const handleClickCategories = useCallback((url) => {
    navigate(url);
  });

  return (
    <Container>
      <ListContainer
        onClickCategories={handleClickCategories}
        pathname={pathname}
        search={search}
      />
    </Container>
  );
}
