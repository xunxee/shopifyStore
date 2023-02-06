import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import ProductWrapper from './ProductWrapper';

import { loadProduct } from './slice';

const RelatedProducts = styled.div({
});

export default function ProductDetailContainer() {
  const dispatch = useDispatch();

  const product = useSelector(get({
    page: 'productDetail', key: 'product',
  }));

  useEffect(() => {
    dispatch(loadProduct());
  }, []);

  if (!product.imageList) {
    return null;
  }

  return (
    <>
      <ProductWrapper product={product} />
      <RelatedProducts />
    </>
  );
}
