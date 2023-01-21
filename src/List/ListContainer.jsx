import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect } from 'react';

import {
  changeUrlAllDataFields,
  changeUrlDataField,
  loadProductList,
} from './slice';

import CategoryBar from './component/CategoryBar';
import ItemList from './ItemList';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

import { get } from '../utils';

const Container = styled.div({
  display: 'flex',
  minWidth: '950px',
  maxWidth: '1300px',
  minHeight: 'calc(100vh - 110px)',
  margin: '0 auto',
});

const Layout = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '192px',
});

export default function ListContainer({
  onClickCategories,
  urlPathname,
  urlSearch,
}) {
  const dispatch = useDispatch();

  const listStates = useSelector(({ list }) => list);

  const productList = useSelector(get({
    page: 'list', key: 'productList',
  }));

  const {
    url: {
      category, product, sort, material,
    },
  } = listStates;

  useEffect(() => {
    dispatch(loadProductList());

    const isClickAccess = category || product || sort || material;

    const pathnameList = urlPathname.substring(1).split('/');

    const { length } = pathnameList;

    function makeQueryString(queryStringList) {
      for (let i = 0; i < length; i += 1) {
        if (length === 1) {
          return urlSearch
            ? `${urlSearch}&category=all` : '?category=all';
        }

        if (pathnameList[i] === 'product') {
          queryStringList.push(`product=${pathnameList[2]}`);
        }

        if (pathnameList[i] === 'new') {
          queryStringList.push('category=new');
        }

        if (pathnameList[i] === 'featured') {
          queryStringList.push('category=featured');
        }
      }

      if (queryStringList.length === 0) {
        return false;
      }

      if (urlSearch) {
        return (`${urlSearch}&${queryStringList.join('&')}`);
      }

      return `?${queryStringList.join('&')}`;
    }

    function changeUrlData() {
      const isValidAddress = makeQueryString([]);

      if (!isValidAddress) return;

      const apiDataObject = JSON.parse(`{"${makeQueryString([])
        .substring(1)
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`);

      dispatch(changeUrlAllDataFields(apiDataObject));
    }

    if (!isClickAccess) changeUrlData();
  }, [urlPathname, urlSearch]);

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
      <ItemList
        productList={productList}
      />
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
