import styled from '@emotion/styled';

import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import ProductWrapper from './ProductWrapper';

import { loadProduct, selectImage } from './slice';

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

  const handleClickAlbum = useCallback((number) => {
    dispatch(selectImage(number));
  }, [dispatch]);

  if (!product.imageList) {
    return null;
  }

  return (
    <>
      <ProductWrapper
        product={product}
        onClickAlbum={handleClickAlbum}
      />
      <RelatedProducts />
    </>
  );
}
