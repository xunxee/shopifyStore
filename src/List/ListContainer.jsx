import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  changeAllCategories,
  changeSort,
  changeMaterial,
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

  const category = useSelector(get({
    page: 'list',
    key: 'category',
  }));

  const product = useSelector(get({
    page: 'list',
    key: 'product',
  }));

  const sort = useSelector(get({
    page: 'list',
    key: 'sort',
  }));

  const material = useSelector(get({
    page: 'list',
    key: 'material',
  }));

  const handleClickCategory = useCallback((name) => {
    dispatch(changeAllCategories({
      name,
      belong: 'category',
    }));

    if (product) {
      navigate(`/search/products/${product}/${name}`);

      return;
    }

    navigate(`/search/${name}`);
  }, [dispatch, navigate, product]);

  const handleClickProduct = useCallback((name) => {
    dispatch(changeAllCategories({
      name,
      belong: 'product',
    }));

    if (category) {
      navigate(`/search/products/${name}/${category}`);

      return;
    }

    navigate(`/search/products/${name}`);
  }, [dispatch, navigate, category]);

  const handleClickSort = useCallback((name) => {
    dispatch(changeSort(name));
  }, [dispatch]);

  const handleClickMaterial = useCallback((name) => {
    dispatch(changeMaterial(name));
  }, [dispatch]);

  return (
    <Container>
      <CategoryBar
        category={category}
        product={product}
        onClickCategory={handleClickCategory}
        onClickProduct={handleClickProduct}
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
