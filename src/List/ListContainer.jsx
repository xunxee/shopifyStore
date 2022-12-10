import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  changesCategories,
  changesProducts,
  changesSort,
  changesMaterial,
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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const categories = useSelector(get({
    page: 'list',
    key: 'categories',
  }));

  const products = useSelector(get({
    page: 'list',
    key: 'products',
  }));

  const sort = useSelector(get({
    page: 'list',
    key: 'sort',
  }));

  const material = useSelector(get({
    page: 'list',
    key: 'material',
  }));

  const handleClickCategories = useCallback((name) => {
    dispatch(changesCategories(name));
    navigate(`/search/${name}`);
  }, [dispatch, navigate]);

  const handleClickProducts = useCallback((name) => {
    dispatch(changesProducts(name));
  }, [dispatch]);

  const handleClickSort = useCallback((name) => {
    dispatch(changesSort(name));
  }, [dispatch]);

  const handleClickMaterial = useCallback((name) => {
    dispatch(changesMaterial(name));
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
      <RelevanceBar
        sort={sort}
        material={material}
        onClickSort={handleClickSort}
        onClickMaterial={handleClickMaterial}
      />
    </Container>
  );
}
