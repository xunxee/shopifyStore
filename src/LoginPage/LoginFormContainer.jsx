import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';
import LoginForm from './LoginForm';

import {
  setIsLogin,
  changeLoginFields,
  requestLogin,
  requestSignup,
} from './slice';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const isLogin = useSelector(get({
    page: 'login',
    key: 'isLogin',
  }));

  const loginFields = useSelector(get({
    page: 'login',
    key: 'loginFields',
  }));

  const handleClickToggle = useCallback(() => {
    dispatch(setIsLogin());
  }, [dispatch]);

  const handleChange = useCallback(({ name, value }) => {
    dispatch(changeLoginFields({ name, value }));
  }, [dispatch]);

  function handleSubmit() {
    return isLogin
      ? dispatch(requestLogin()) : dispatch(requestSignup());
  }

  return (
    <div>
      <LoginForm
        isLogin={isLogin}
        fields={{ loginFields }}
        onClick={handleClickToggle}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
