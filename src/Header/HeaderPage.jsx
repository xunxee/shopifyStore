import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import {
  setIsAccountModalOpen,
  logout,
  clearLoginFields,
} from '../LoginPage/slice';

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
  marginRight: 'auto',
  marginLeft: 'auto',
  color: '#EAEAEA',
  backgroundColor: '#000',
});

export default function HeaderPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClickCategories = useCallback((url) => {
    navigate(url);
  }, [navigate]);

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
          onClickCategories={handleClickCategories}
        />
        <SearchBarContainer />
        <PurchaseContainer
          onClick={handleToggle}
        />
      </NavBarLayout>
    </Container>
  );
}
