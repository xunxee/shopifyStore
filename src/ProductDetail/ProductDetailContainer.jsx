import styled from '@emotion/styled';

import { useEffect, useState, useCallback } from 'react';

import { v4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import ProductWrapper from './ProductWrapper/ProductWrapper';

import {
  loadProduct,
  selectSize,
} from './slice';

const RelatedProducts = styled.div({});

export default function ProductDetailContainer() {
  const dispatch = useDispatch();

  const product = useSelector(
    get({
      page: 'productDetail',
      key: 'product',
    }),
  );

  // TODO: DetailOptionButton 컴포넌트에서 사용 예정
  const selectedSize = useSelector(
    get({
      page: 'productDetail',
      key: 'selectedSize',
    }),
  );

  const { imageList } = product;

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    dispatch(loadProduct());
  }, []);

  useEffect(() => {
    setBanners([...imageList, ...imageList, ...imageList]);

    setBanners((bannerList) => {
      const result = bannerList.map((imgUrl) => ({
        key: v4(),
        imgUrl,
      }));

      return result;
    });
  }, [product]);

  const handleClickSize = useCallback((name) => {
    dispatch(selectSize(name));
  }, [dispatch]);

  if (banners.length === 0) {
    return null;
  }

  return (
    <>
      <ProductWrapper
        product={product}
        banners={banners}
        selectedSize={selectedSize}
        onClickSize={handleClickSize}
      />
      <RelatedProducts />
    </>
  );
}
