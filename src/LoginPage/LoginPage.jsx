import styled from '@emotion/styled';

import LoginFormContainer from './LoginFormContainer';

const Container = styled.div({
  width: '418px',
  height: '420px',
  backgroundColor: '#000000',
  color: '#EAEAEA',
  position: 'absolute',
  zIndex: '30',
  margin: '0',
  top: '50%',
  left: '50%',
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
