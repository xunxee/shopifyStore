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

  useEffect(() => {
    dispatch(loadHomePageProductList());
  }, []);

  return (
    <>
      <div>HomePageContainer</div>
      <div>{JSON.stringify(homePageProductList)}</div>
    </>
  );
}
