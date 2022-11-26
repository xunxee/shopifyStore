import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import LoginForm from './LoginForm';

import {
  setIsLogin,
  clearLoginFields,
  changeLoginFields,
  requestLogin,
  requestSignUp,
  checkSignUpValid,
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
    dispatch(clearLoginFields());
  }, [dispatch]);

  const handleChange = useCallback(({ name, value }) => {
    dispatch(changeLoginFields({ name, value }));
  }, [dispatch]);

  const handleCheckSignUpValid = useCallback(({ name }) => {
    const { [name]: { value } } = loginFields;

    dispatch(checkSignUpValid({ name, value }));
  }, [dispatch, loginFields]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (isLogin) {
      dispatch(requestLogin());
      return;
    }

    dispatch(requestSignUp());
  }, [dispatch, isLogin]);

  return (
    <div>
      <LoginForm
        isLogin={isLogin}
        fields={loginFields}
        onChange={handleChange}
        onBlur={handleCheckSignUpValid}
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
