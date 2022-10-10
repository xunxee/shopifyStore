import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import { setIsLoginState } from '../slice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const isLogin = useSelector((selector) => selector.isLogin);

  const handleClickLoginState = useCallback(() => {
    dispatch(setIsLoginState());
  }, []);

  return (
    <div>
      <LoginForm
        onClick={handleClickLoginState}
        isLogin={isLogin}
      />
    </div>
  );
}
