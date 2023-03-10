import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { loadHomePageProductList } from './slice';

import { get } from '../utils';
import RepresentativeProductList from './RepresentativeProductList';

export default function HomePageContainer() {
  const dispatch = useDispatch();

  const homePageProductList = useSelector(get(
    {
      page: 'homePage',
      key: 'homePageProductList',
    },
  ));

  const { topProductList } = homePageProductList;

  useEffect(() => {
    dispatch(loadHomePageProductList());
  }, []);

  return (
    <div>
      <RepresentativeProductList
        productList={topProductList}
      />
    </div>
  );
}
