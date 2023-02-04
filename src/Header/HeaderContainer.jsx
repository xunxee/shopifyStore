import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import { get } from '../utils';

import {
  setIsAccountModalOpen,
  logout,
  clearAccountFields,
  setButtonActive,
} from '../Membership/slice';

import {
  changeUrlDataField,
  changeUrlAllDataFields,
} from '../List/slice';

import {
  changeSearchBarFields,
} from './slice';

import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

import MembershipPage from '../Membership/MemberShipPage';
import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import UserBar from './UserBar';

const { initialCategoryList } = LIST_CATEGORIES;

const Container = styled.div({
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '30',
  width: '100%',
  minWidth: '950px',
  backgroundColor: '#000',
});

const NavBarLayout = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '90%',
  maxWidth: '1920px',
  height: '74px',
  margin: '0 auto',
  color: '#EAEAEA',
  backgroundColor: '#000',
});

export default function HeaderContainer({
  onClick,
  onKeyDown,
}) {
  const dispatch = useDispatch();

  const handleClickCategories = useCallback(({
    pathname,
    name,
  }) => {
    onClick(pathname);

    if (name === 'all') {
      dispatch(changeUrlDataField({
        name: '', belong: 'category',
      }));

      return;
    }

    dispatch(changeUrlDataField({
      name, belong: 'category',
    }));
  }, [onClick, dispatch]);

  const {
    refreshToken,
    isAccountModalOpen,
  } = useSelector(({ membership }) => membership);

  const { value: searchBarValue } = useSelector(get({
    page: 'header',
    key: 'searchBarFields',
  }));

  const handleToggle = useCallback(() => {
    dispatch(setIsAccountModalOpen());
    dispatch(clearAccountFields());
    dispatch(setButtonActive(false));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearAccountFields({
      name: 'password',
      value: '',
    }));
  }, [dispatch]);

  const handleChange = useCallback(({ value }) => {
    dispatch(changeSearchBarFields({ value }));
  }, [dispatch]);

  const handleKeyDown = useCallback(() => {
    const url = `/search?q=${searchBarValue}`;

    onKeyDown(url);

    dispatch(changeUrlAllDataFields(initialCategoryList));
  }, [searchBarValue]);

  return (
    <Container>
      {isAccountModalOpen && (
        <MembershipPage
          refreshToken={refreshToken}
          onClickToggle={handleToggle}
          onClickLogout={handleLogout}
        />
      )}
      <NavBarLayout>
        <TitleBar
          onClick={handleClickCategories}
        />
        <SearchBar
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <UserBar
          onClick={handleToggle}
        />
      </NavBarLayout>
    </Container>
  );
}
