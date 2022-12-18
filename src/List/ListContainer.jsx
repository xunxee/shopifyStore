import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  checkUrl,
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
  // TODO:
  // pathname,
  // search,
}) {
  const dispatch = useDispatch();

  const {
    category,
    product,
    sort,
    material,
  } = useSelector(({ list }) => list);

  const handleClick = useCallback(({ name, belong }) => {
    onClickCategories(dispatch(checkUrl({ name, belong })));
  }, [dispatch, onClickCategories]);

  return (
    <Container>
      <Layout>
        <CategoryBar
          field="categories"
          selectedItem={category}
          onClick={handleClick}
        />
        <CategoryBar
          field="products"
          selectedItem={product}
          onClick={handleClick}
        />
      </Layout>
      <ItemPage />
      <Layout>
        <CategoryBar
          field="sort"
          selectedItem={sort}
          onClick={handleClick}
        />
        <CategoryBar
          field="material"
          selectedItem={material}
          onClick={handleClick}
        />
      </Layout>
    </Container>
  );
}
