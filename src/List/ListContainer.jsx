import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  changeUrlDataField,
} from './slice';

import CategoryBar from './component/CategoryBar';
import ItemPage from './ItemPage';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

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

  const listStates = useSelector(({ list }) => list);

  const {
    url: {
      category, product, sort, material,
    },
  } = listStates;

  function checkUrl({ name, belong }) {
    function returnEntries(kind) {
      const { url } = LIST_CATEGORIES;

      const { url: { ...newListStates } } = listStates;
      newListStates[belong] = name;

      return Object.entries(newListStates)
        .filter(([categoryName]) => url[kind]
          .includes(categoryName));
    }

    function makePathname() {
      const pathname = ['/search'];

      const pathnameEntries = returnEntries('pathnames');

      pathnameEntries.forEach(([
        categoryName,
        categoryValue,
      ]) => {
        if (!categoryValue) return;

        if (categoryName === 'product') {
          pathname.push(`/product/${categoryValue}`);
        }

        if (categoryName === 'category') {
          pathname.push(`/${categoryValue}`);
        }
      });

      return pathname;
    }

    function makeSearch() {
      const search = [];

      const searchEntries = returnEntries('searches');

      searchEntries.forEach(([
        categoryName,
        categoryValue,
      ]) => {
        if (!categoryValue) return;

        if (search.length) {
          search.push(`&${categoryName}=${categoryValue}`);
        }

        if (!search.length) {
          search.push(`?${categoryName}=${categoryValue}`);
        }
      });

      return search;
    }

    return [...makePathname(), ...makeSearch()].join('');
  }

  const handleClick = useCallback(({ name, belong }) => {
    dispatch(changeUrlDataField({ name, belong }));

    onClickCategories(checkUrl({ name, belong }));
  }, [
    dispatch,
    onClickCategories,
    listStates,
    checkUrl,
  ]);

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
