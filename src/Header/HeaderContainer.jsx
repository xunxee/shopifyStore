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

import TitleContainer from './TitleContainer';
import SearchBarContainer from './SearchBarContainer';
import PurchaseContainer from './PurchaseContainer';
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

  const category = useSelector(get({
    page: 'list',
    key: 'category',
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
        <TitleContainer
          category={category}
          onClick={handleClickCategories}
        />
        <SearchBarContainer />
        <PurchaseContainer
          onClick={handleToggle}
        />
      </NavBarLayout>
    </Container>
  );
}
// HeaderPage -> HeaderContainer
// HeaderPage를 하나 더 만들어야하고 -> 여기서 'react-router-dom'
// Form은 진짜 그 HTML <From />을 말하는구나
// SearchBarContainer -> SearchBar
// TitleContainer -> TitleBar
// PurchaseContainer -> UserBar
