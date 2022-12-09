import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  changesCategories,
  changesProducts,
} from './slice';

import CategoryBar from './CategoryBar';
import RelevanceBar from './RelevanceBar';
import ItemPage from './ItemPage';

import { get } from '../utils';

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

  const categories = useSelector(get({
    page: 'list',
    key: 'categories',
  }));

  const products = useSelector(get({
    page: 'list',
    key: 'products',
  }));

  const handleClickCategories = useCallback((name) => {
    dispatch(changesCategories(name));
  }, [dispatch]);

  const handleClickProducts = useCallback((name) => {
    dispatch(changesProducts(name));
  }, [dispatch]);

  return (
    <Container>
      <CategoryBar
        categories={categories}
        products={products}
        onClickCategories={handleClickCategories}
        onClickProducts={handleClickProducts}
      />
      <ItemPage />
      <RelevanceBar />
    </Container>
  );
}
