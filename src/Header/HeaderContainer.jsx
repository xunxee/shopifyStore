import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  setIsAccountModalOpen,
  logout,
  clearLoginFields,
  setButtonActive,
} from '../LoginPage/slice';

import {
  changeCategoriesDataField,
} from '../List/slice';

import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import UserBar from './UserBar';
import LoginPage from '../LoginPage/LoginPage';

const Container = styled.div({
  position: 'fixed',
  top: '0',
  left: '0',
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

export default function HeaderContainer({ onClick }) {
  const dispatch = useDispatch();

  const handleClickCategories = useCallback(({
    pathname,
    name,
  }) => {
    onClick(pathname);

    dispatch(changeCategoriesDataField({
      name, belong: 'category',
    }));
  }, [onClick, dispatch]);

  const {
    refreshToken,
    isAccountModalOpen,
  } = useSelector(({ login }) => login);

  const handleToggle = useCallback(() => {
    dispatch(setIsAccountModalOpen());
    dispatch(clearLoginFields());
    dispatch(setButtonActive(false));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    dispatch(clearLoginFields({
      name: 'password',
      value: '',
    }));
  }, [dispatch]);

  return (
    <Container>
      {isAccountModalOpen && (
        <LoginPage
          refreshToken={refreshToken}
          onClickToggle={handleToggle}
          onClickLogout={handleLogout}
        />
      )}
      <NavBarLayout>
        <TitleBar
          onClick={handleClickCategories}
        />
        <SearchBar />
        <UserBar
          onClick={handleToggle}
        />
      </NavBarLayout>
    </Container>
  );
}
