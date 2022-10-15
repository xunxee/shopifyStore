import styled from '@emotion/styled';

import { useDispatch, useSelector } from 'react-redux';

import { setIsModal } from '../LoginPage/slice';

import TitleContainer from './TitleContainer';
import SearchBarContainer from './SearchBarContainer';
import PurchaseContainer from './PurchaseContainer';
import LoginPage from '../LoginPage/LoginPage';

import { get } from '../utils';

const Container = styled.div({
  backgroundColor: 'blue',
});

export default function HeaderPage() {
  const dispatch = useDispatch();

  const isModal = useSelector(get({
    page: 'login',
    key: 'isModal',
  }));

  function handleToggle() {
    dispatch(setIsModal());
  }

  return (
    <Container>
      {isModal && <LoginPage />}
      <TitleContainer />
      <SearchBarContainer />
      <PurchaseContainer onClick={handleToggle} />
    </Container>
  );
}
