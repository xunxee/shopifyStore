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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(requestLogin());
      return;
    }

    dispatch(requestSignup());
  }, [dispatch]);

  return (
    <div>
      <LoginForm
        isLogin={isLogin}
        fields={loginFields}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <button
        type="button"
        onClick={handleClickToggle}
      >
        {isLogin ? 'Sign Up' : 'Log In' }
      </button>
    </div>
  );
}
