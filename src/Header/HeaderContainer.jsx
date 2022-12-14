import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  setIsAccountModalOpen,
  logout,
  clearLoginFields,
} from '../LoginPage/slice';

import {
  changeAllCategories,
} from '../List/slice';

import TitleBar from './TitleBar';
import SearchBar from './SearchBar';
import UserBar from './UserBar';
import LoginPage from '../LoginPage/LoginPage';

import { get } from '../utils';

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

  const handleClickCategories = useCallback((
    url,
    name,
  ) => {
    onClick(url);

    dispatch(changeAllCategories({
      name, belong: 'category',
    }));
  }, [onClick, dispatch]);

  const refreshToken = useSelector(get({
    page: 'login',
    key: 'refreshToken',
  }));

  const isAccountModalOpen = useSelector(get({
    page: 'login',
    key: 'isAccountModalOpen',
  }));

  const handleToggle = useCallback(() => {
    dispatch(setIsAccountModalOpen());
    dispatch(clearLoginFields());
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
