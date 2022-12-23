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

  function makeUrl({ name, belong }) {
    const { url: { ...urlStates } } = listStates;
    urlStates[belong] = name;

    function makePathname() {
      const pathname = ['/search'];

      const {
        product: productValue,
        category: categoryValue,
      } = urlStates;

      if (productValue) pathname.push(`/product/${productValue}`);

      if (categoryValue) pathname.push(`/${categoryValue}`);

      return pathname;
    }

    function makeSearch() {
      const { url } = LIST_CATEGORIES;

      const search = [];

      const searchEntries = Object.entries(urlStates)
        .filter(([categoryName]) => url.searches
          .includes(categoryName));

      searchEntries.forEach(([
        categoryName,
        categoryValue,
      ]) => {
        if (!categoryValue) return;

        if (search.length) {
          search.push(`&${categoryName}=${categoryValue}`);

          return;
        }

        search.push(`?${categoryName}=${categoryValue}`);
      });

      return search;
    }

    return [...makePathname(), ...makeSearch()].join('');
  }

  const handleClick = useCallback(({ name, belong }) => {
    dispatch(changeUrlDataField({ name, belong }));

    const url = makeUrl({ name, belong });

    onClickCategories(url);
  }, [
    dispatch,
    onClickCategories,
    listStates,
    makeUrl,
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
