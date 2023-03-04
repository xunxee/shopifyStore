import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState, useCallback } from 'react';

import { v4 } from 'uuid';

import { get } from '../utils';

import ProductWrapper from './ProductWrapper/ProductWrapper';

import {
  loadProduct,
  selectSize,
  selectColor,
  setIsInfoOpen,
} from './slice';

import PALETTE from '../styles/palette';

const { paleGray } = PALETTE;

const Horizon = styled.hr({
  marginTop: '1.75rem',
  borderTop: `1px solid ${paleGray}`,
});

const RelatedProducts = styled.div({
  borderColor: paleGray,
});

export default function ProductDetailContainer() {
  const dispatch = useDispatch();

  const product = useSelector(
    get({
      page: 'productDetail',
      key: 'product',
    }),
  );

  const {
    selectedSize,
    selectedColor,
    isCareInfoOpen,
    isDetailsInfoOpen,
  } = useSelector((selector) => selector.productDetail);

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

  const handleClickColor = useCallback((name) => {
    dispatch(selectColor(name));
  }, [dispatch]);

  const handleClickAdditionalInfo = useCallback((name) => {
    dispatch(setIsInfoOpen({ name }));
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
        selectedColor={selectedColor}
        onClickColor={handleClickColor}
        isCareInfoOpen={isCareInfoOpen}
        isDetailsInfoOpen={isDetailsInfoOpen}
        onClickAdditionalInfo={handleClickAdditionalInfo}
      />
      <Horizon />
      <RelatedProducts />
    </>
  );
}
