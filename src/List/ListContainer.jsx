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
  }, []);

  useEffect(() => {
    const pathnameList = urlPathname.substring(1).split('/');

    function makeQueryString() {
      const queryStringList = [];

      if (pathnameList.length === 1) {
        return `${urlSearch
          ? `${urlSearch}&category=all` : '?category=all'}`;
      }

      for (let i = 1; i < pathnameList.length; i += 1) {
        const pathname = pathnameList[i];

        if (pathname === 'product') {
          const productName = pathnameList[i + 1];
          queryStringList.push(`product=${productName}`);
        }

        if (pathname === 'new' || pathname === 'featured') {
          queryStringList.push(`category=${pathname}`);
        }
      }

      if (queryStringList.length === 0) {
        return false;
      }

      return urlSearch
        ? `${urlSearch}&${queryStringList.join('&')}`
        : `?${queryStringList.join('&')}`;
    }

    const isValidAddress = makeQueryString();

    if (!isValidAddress) return;

    const apiDataObject = JSON.parse(`{"${
      isValidAddress
        .substring(1)
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
    }"}`);

    const isClickAccess = category || product || sort || material;

    if (!isClickAccess) {
      dispatch(changeUrlAllDataFields(apiDataObject));
    }

    // TODO: back-end와의 통신 준비
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
