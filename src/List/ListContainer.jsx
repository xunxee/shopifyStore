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

  const handleClickCategory = useCallback(({
    name, belong,
  }) => {
    dispatch(changeCategoriesDataField({
      name,
      belong,
    }));

    if (product) {
      onClickCategories(
        `/search/products/${product}/${name}${search}`,
      );

      return;
    }

    onClickCategories(`/search/${name}`);
  }, [dispatch, onClickCategories, product, search]);

  const handleClickProduct = useCallback(({
    name, belong,
  }) => {
    dispatch(changeCategoriesDataField({
      name,
      belong,
    }));

    if (category) {
      onClickCategories(
        `/search/products/${name}/${category}${search}`,
      );

      return;
    }

    onClickCategories(`/search/products/${name}`);
  }, [dispatch, onClickCategories, category, search]);

  const handleClickSort = useCallback(({
    name, belong,
  }) => {
    dispatch(changeCategoriesDataField({
      name,
      belong,
    }));

    onClickCategories(`${pathname}?sort=${name}`);
  }, [dispatch, onClickCategories, pathname]);

  const handleClickMaterial = useCallback(({
    name, belong,
  }) => {
    dispatch(changeCategoriesDataField({
      name,
      belong,
    }));
  }, [dispatch]);

  return (
    <Container>
      <Layout>
        <CategoryBar
          field="categories"
          selectedItem={category}
          onClick={handleClickCategory}
        />
        <CategoryBar
          field="products"
          selectedItem={product}
          onClick={handleClickProduct}
        />
      </Layout>
      <ItemPage />
      <Layout>
        <CategoryBar
          field="sort"
          selectedItem={sort}
          onClick={handleClickSort}
        />
        <CategoryBar
          field="material"
          selectedItem={material}
          onClick={handleClickMaterial}
        />
      </Layout>
    </Container>
  );
}
