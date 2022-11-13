import styled from '@emotion/styled';

import { useRef, useEffect } from 'react';

import LoginFormContainer from './LoginFormContainer';

const DeleteAll = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(0.8px)',
});

const Container = styled.div(
  {
    position: 'absolute',
    color: '#EAEAEA',
    backgroundColor: '#000000',
  },
  ({ 'data-testid': name }) => (
    name === 'LoginPage' ? ({
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '418px',
      height: '420px',
    }) : ({
      top: '74px',
      right: 0,
      width: '150px',
      height: '100px',
    })
  ),
);

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
    <>
      {!refreshToken && (
        <DeleteAll data-testid="outsideTheModal">
          <Container
            data-testid="LoginPage"
            ref={refLogin}
          >
            <button
              type="button"
              onClick={onClickToggle}
            >
              X
            </button>
            <div>Logo</div>
            <LoginFormContainer />
          </Container>
        </DeleteAll>
      )}
      {refreshToken && (
        <Container
          data-testid="LogoutPage"
          ref={refLogin}
        >
          <button
            type="button"
            onClick={onClickToggle}
          >
            X
          </button>
          <div>LogoutPage</div>
          <button
            type="button"
            onClick={onClickLogout}
          >
            Log out
          </button>
        </Container>
      )}
    </>
  );
}
