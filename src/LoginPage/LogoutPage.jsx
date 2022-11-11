import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { useRef, useEffect } from 'react';

import {
  logout,
  changeLoginFields,
} from './slice';

const DeleteAll = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(0.8px)',
});

const Container = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '270px',
  color: '#EAEAEA',
  backgroundColor: '#000000',
});

export default function LogoutPage({ onClick }) {
  const dispatch = useDispatch();

  const refLogout = useRef();

  function listener({ target }) {
    if (refLogout.current.contains(target)) return;
    onClick();
  }

  function handleClickLogout() {
    dispatch(logout());
    dispatch(changeLoginFields({
      name: 'password',
      value: '',
    }));
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <DeleteAll data-testid="outsideTheModal">
      <Container
        data-testid="LogoutPage"
        ref={refLogout}
      >
        <button
          type="button"
          onClick={onClick}
        >
          X
        </button>
        <div>LogoutPage</div>
        <button
          type="button"
          onClick={handleClickLogout}
        >
          Log out
        </button>
      </Container>
    </DeleteAll>
  );
}
