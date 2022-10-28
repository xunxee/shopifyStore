import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';

import { setIsModalOpen } from '../LoginPage/slice';

import TitleContainer from './TitleContainer';
import SearchBarContainer from './SearchBarContainer';
import PurchaseContainer from './PurchaseContainer';
import LoginPage from '../LoginPage/LoginPage';

import { get } from '../utils';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  minWidth: '950px',
  height: '74px',
  padding: '0 1.5rem',
  color: '#EAEAEA',
  backgroundColor: '#000000',
});

export default function HeaderPage() {
  const dispatch = useDispatch();

  const isModalOpen = useSelector(get({
    page: 'login',
    key: 'isModalOpen',
  }));

  const handleToggle = useCallback(() => {
    dispatch(setIsModalOpen());
  }, [dispatch]);

  return (
    <Container>
      {isModalOpen && (
        <LoginPage
          onClick={handleToggle}
        />
      )}
      <TitleContainer />
      <SearchBarContainer />
      <PurchaseContainer
        onClick={handleToggle}
      />
    </Container>
  );
}
