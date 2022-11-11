import styled from '@emotion/styled';

import { useRef, useEffect } from 'react';

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
  const refLogout = useRef();

  function listener({ target }) {
    if (refLogout.current.contains(target)) return;
    onClick();
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
        <div>LogoutPage</div>
        <button type="button">
          Log out
        </button>
      </Container>
    </DeleteAll>
  );
}
