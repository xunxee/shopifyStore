import styled from '@emotion/styled';

import { useRef, useEffect } from 'react';

import LoginFormContainer from './LoginFormContainer';

const DeleteAll = styled.div((
  { 'data-testid': name },
) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  ...(name === 'outsideTheModal' && {
    backdropFilter: 'blur(0.8px)',
  }),
}));

const Container = styled.div((
  { 'data-testid': name },
) => {
  const LoginPageLocation = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '418px',
    height: '420px',
  };

  const LogoutPageLocation = {
    top: '74px',
    right: 0,
    width: '150px',
    height: '100px',
  };

  return {
    position: 'absolute',
    color: '#EAEAEA',
    backgroundColor: '#000000',

    ...(name === 'LoginPage'
      ? LoginPageLocation : LogoutPageLocation),
  };
});

export default function LoginPage({
  refreshToken,
  onClickToggle,
  onClickLogout,
}) {
  const refLogin = useRef();

  function listener({ target }) {
    if (refLogin.current.contains(target)) return;
    onClickToggle();
  }

  useEffect(() => {
    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <DeleteAll
      data-testid={refreshToken ? null : 'outsideTheModal'}
    >
      <Container
        data-testid={refreshToken
          ? 'LogoutPage' : 'LoginPage'}
        ref={refLogin}
      >
        <button
          type="button"
          onClick={onClickToggle}
        >
          X
        </button>
        <div>{refreshToken ? 'Logo' : 'LogoutPage'}</div>
        {
          refreshToken ? (
            <button
              type="button"
              onClick={onClickLogout}
            >
              Log out
            </button>
          )
            : <LoginFormContainer />
        }
      </Container>
    </DeleteAll>
  );
}
