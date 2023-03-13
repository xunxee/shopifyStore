import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { loadHomePageProductList } from './slice';

import { get } from '../utils';

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
  } = homePageProductList;

  useEffect(() => {
    dispatch(loadHomePageProductList());
  }, []);

  if (topProductList.length === 0) return null;

  return (
    <div>{JSON.stringify(topProductList)}</div>
  );
}
