import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { loadHomePageProductList } from './slice';

import { get } from '../utils';

import RepresentativeProductList from './RepresentativeProductList';
import AutoSlide from './InfiniteMarquee/AutoSlide';

export default function HomePageContainer() {
  const dispatch = useDispatch();

  const homePageProductList = useSelector(get(
    {
      page: 'homePage',
      key: 'homePageProductList',
    },
  ));

  const {
    topProductList,
    recommendedProductList,
  } = homePageProductList;

  useEffect(() => {
    dispatch(loadHomePageProductList());
  }, []);

  if (topProductList.length === 0) return null;

  return (
    <>
      <RepresentativeProductList
        name="main"
        productList={topProductList}
      />
      <AutoSlide
        name="main"
        productList={topProductList}
      />
      <RepresentativeProductList
        name="secondary"
        productList={topProductList}
      />
      <AutoSlide
        name="secondary"
        productList={recommendedProductList}
      />
    </>
  );
}
