import styled from '@emotion/styled';

import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  changeAllCategories,
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

  const { pathname, search } = useLocation();

  const handleClickCategory = useCallback((name) => {
    dispatch(changeAllCategories({
      name,
      belong: 'category',
    }));

    if (product) {
      navigate(
        `/search/products/${product}/${name}${search}`,
      );

      return;
    }

    navigate(`/search/${name}`);
  }, [dispatch, navigate, product, search]);

  const handleClickProduct = useCallback((name) => {
    dispatch(changeAllCategories({
      name,
      belong: 'product',
    }));

    if (category) {
      navigate(
        `/search/products/${name}/${category}${search}`,
      );

      return;
    }

    navigate(`/search/products/${name}`);
  }, [dispatch, navigate, category, search]);

  const handleClickSort = useCallback((name) => {
    dispatch(changeAllCategories({
      name,
      belong: 'sort',
    }));

    navigate(`${pathname}?sort=${name}`);
  }, [dispatch, navigate, pathname]);

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
