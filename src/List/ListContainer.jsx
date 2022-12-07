import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import { changesCategories } from './slice';

import CategoryBar from './CategoryBar';
import RelevanceBar from './RelevanceBar';
import ItemPage from './ItemPage';

const Container = styled.div({
  display: 'flex',
  minWidth: '950px',
  maxWidth: '1300px',
  minHeight: 'calc(100vh - 110px)',
  margin: '0 auto',
  backgroundColor: '#f8ddaf',
});

export default function ListContainer() {
  const dispatch = useDispatch();

  const handleClickCategories = useCallback((name) => {
    dispatch(changesCategories(name));
  }, [dispatch]);

  return (
    <Container>
      <CategoryBar
        onClickCategories={handleClickCategories}
      />
      <ItemPage />
      <RelevanceBar />
    </Container>
  );
}
