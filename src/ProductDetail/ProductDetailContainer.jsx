import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { v4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import ProductWrapper from './ProductWrapper/ProductWrapper';

import { loadProduct } from './slice';

const RelatedProducts = styled.div({});

export default function ProductDetailContainer() {
  const dispatch = useDispatch();

  const product = useSelector(
    get({
      page: 'productDetail',
      key: 'product',
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

  if (banners.length === 0) {
    return null;
  }

  return (
    <>
      <ProductWrapper product={product} banners={banners} />
      <RelatedProducts />
    </>
  );
}
