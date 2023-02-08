import { useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import ListContainer from './ListContainer';

export default function ListPage() {
  const navigate = useNavigate();

  const { pathname, search } = useLocation();

  const handleClickCategories = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  const handleClickItemList = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  return (
    <ListContainer
      onClickCategories={handleClickCategories}
      onClickItemList={handleClickItemList}
      urlPathname={pathname}
      urlSearch={search}
    />
  );
}
