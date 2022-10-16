import styled from '@emotion/styled';

import LoginFormContainer from './LoginFormContainer';

const Container = styled.div({
  position: 'absolute',
  // zIndex: '30',
  margin: '0',
  top: '50%',
  left: '50%',
  width: '418px',
  height: '420px',
  color: '#EAEAEA',
  backgroundColor: '#000000',
  transform: 'translate(-50%, -50%)',
});

export default function LoginPage() {
  return (
    <Container>
      <button type="button">X</button>
      <div>Logo</div>
      <LoginFormContainer />
    </Container>
  );
}
