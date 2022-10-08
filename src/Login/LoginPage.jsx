import styled from '@emotion/styled';

import LoginFormContainer from './LoginFormContainer';

const Container = styled.div({
  width: '418px',
  height: '420px',
  backgroundColor: '#000000',
  color: '#EAEAEA',
  // '& p': {},
});

export default function LoginPage() {
  return (
    <Container>
      <button type='button'>X</button>
      <div>Login</div>
      <LoginFormContainer />
      <p>Don't have an account?</p>
      <button type='button'>Sign Up</button>
    </Container>
  );
}
