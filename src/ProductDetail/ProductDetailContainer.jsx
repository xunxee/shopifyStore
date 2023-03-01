import styled from '@emotion/styled';

import { useEffect, useState, useCallback } from 'react';

import { v4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import ProductWrapper from './ProductWrapper/ProductWrapper';

import {
  loadProduct,
  selectSize,
  selectColor,
  setIsModalOpen,
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

  const {
    selectedSize,
    selectedColor,
    isCareModalOpen,
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
    dispatch(setIsModalOpen({ name }));
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
        isCareModalOpen={isCareModalOpen}
        onClickAdditionalInfo={handleClickAdditionalInfo}
      />
      <RelatedProducts />
    </>
  );
}
