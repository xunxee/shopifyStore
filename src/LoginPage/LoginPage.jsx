import styled from '@emotion/styled';

import { useRef, useEffect } from 'react';

import LoginFormContainer from './LoginFormContainer';

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

export default function LoginPage({
  onClick,
  refUserIcon,
}) {
  const refLogin = useRef();

  function listener({ target }) {
    if (refUserIcon.current.contains(target)) { return; }
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
    <Container ref={refLogin}>
      <button type="button">X</button>
      <div>Logo</div>
      <LoginFormContainer />
    </Container>
  );
}
