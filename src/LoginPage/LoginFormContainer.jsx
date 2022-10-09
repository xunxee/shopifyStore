import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import { setIsLoginState } from '../slice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const isLoginState = useSelector((selector) => selector.isLoginState);

  console.log(isLoginState);

  const handleClickLoginState = useCallback(() => {
    dispatch(setIsLoginState());
  }, []);

  return (
    <div>
      {isLoginState ? (
        <LoginForm onClick={handleClickLoginState} />
      ) : (
        <SignUpForm onClick={handleClickLoginState} />
      )}
    </div>
  );
}
