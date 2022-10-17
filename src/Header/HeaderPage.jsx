import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { useCallback } from 'react';
import { setIsModalOpen } from '../LoginPage/slice';

import TitleContainer from './TitleContainer';
import SearchBarContainer from './SearchBarContainer';
import PurchaseContainer from './PurchaseContainer';
import LoginPage from '../LoginPage/LoginPage';

import { get } from '../utils';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '74px',
  padding: '0px 24px',
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
      {isModalOpen && <LoginPage />}
      <TitleContainer />
      <SearchBarContainer />
      <PurchaseContainer onClick={handleToggle} />
    </Container>
  );
}
