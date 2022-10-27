import styled from '@emotion/styled';

import { useRef, useEffect } from 'react';

import LoginFormContainer from './LoginFormContainer';

const DeleteAll = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(0.8px)',
});

const Container = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '418px',
  height: '420px',
  margin: '0',
  color: '#EAEAEA',
  backgroundColor: '#000000',
});

export default function LoginPage({ onClick }) {
  const refLogin = useRef();

  function listener({ target }) {
    if (refLogin.current.contains(target)) { return; }
    onClick();
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <DeleteAll>
      <Container ref={refLogin}>
        <button type="button">X</button>
        <div>Logo</div>
        <LoginFormContainer />
      </Container>
    </DeleteAll>
  );
}
