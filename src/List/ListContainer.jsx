import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  changeCategoriesDataField,
} from './slice';

import CategoryBar from './component/CategoryBar';
import ItemPage from './ItemPage';

const Container = styled.div({
  display: 'flex',
  minWidth: '950px',
  maxWidth: '1300px',
  minHeight: 'calc(100vh - 110px)',
  margin: '0 auto',
  backgroundColor: '#f8ddaf',
});

const Layout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '15%',
});

export default function ListContainer({
  onClickCategories,
  pathname,
  search,
}) {
  const dispatch = useDispatch();

  const {
    category,
    product,
    sort,
    material,
  } = useSelector(({ list }) => list);

  const handleClickCategory = useCallback((name) => {
    dispatch(changeCategoriesDataField({
      name,
      belong: 'category',
    }));

    if (product) {
      onClickCategories(
        `/search/products/${product}/${name}${search}`,
      );

      return;
    }

    onClickCategories(`/search/${name}`);
  }, [dispatch, onClickCategories, product, search]);

  const handleClickProduct = useCallback((name) => {
    dispatch(changeCategoriesDataField({
      name,
      belong: 'product',
    }));

    if (category) {
      onClickCategories(
        `/search/products/${name}/${category}${search}`,
      );

      return;
    }

    onClickCategories(`/search/products/${name}`);
  }, [dispatch, onClickCategories, category, search]);

  const handleClickSort = useCallback((name) => {
    dispatch(changeCategoriesDataField({
      name,
      belong: 'sort',
    }));

    onClickCategories(`${pathname}?sort=${name}`);
  }, [dispatch, onClickCategories, pathname]);

  const handleClickMaterial = useCallback((name) => {
    dispatch(changeCategoriesDataField({
      name,
      belong: 'material',
    }));
  }, [dispatch]);

  return (
    <Container>
      <Layout>
        <CategoryBar
          title="All Categories"
          keyword="categories"
          item={category}
          onClick={handleClickCategory}
        />
        <CategoryBar
          title="All Products"
          keyword="products"
          item={product}
          onClick={handleClickProduct}
        />
      </Layout>
      <ItemPage />
      <Layout>
        <CategoryBar
          title="Sort"
          keyword="sort"
          item={sort}
          onClick={handleClickSort}
        />
        <CategoryBar
          title="Material"
          keyword="material"
          item={material}
          onClick={handleClickMaterial}
        />
      </Layout>
    </Container>
  );
}
