import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import {
  setIsLogin,
  changeLoginFields,
} from './slice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector(({ login }) => login);
  const {
    email,
    password,
    firstName,
    lastName,
  } = useSelector(({ login: { loginFields } }) => loginFields);

  const handleClickToggle = useCallback(() => {
    dispatch(setIsLogin());
  }, [dispatch]);

  const handleChange = useCallback(({ name, value }) => {
    dispatch(changeLoginFields({ name, value }));
  }, [dispatch]);

  return (
    <div>
      <LoginForm
        isLogin={isLogin}
        fields={{
          email, password, firstName, lastName,
        }}
        onClick={handleClickToggle}
        onChange={handleChange}
      />
    </div>
  );
}
