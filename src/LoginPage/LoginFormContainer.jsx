import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import { setIsLogin } from './slice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector(({ login }) => login);

  const handleClickToggle = useCallback(() => {
    dispatch(setIsLogin());
  }, [dispatch]);

  const handleChange = useCallback(({ name, value }) => {
    // dispatch(changeLoginFields());
  }, [dispatch]);

  return (
    <div>
      <LoginForm
        isLogin={isLogin}
        onClick={handleClickToggle}
        onChange={handleChange}
      />
    </div>
  );
}
