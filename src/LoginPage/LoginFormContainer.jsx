import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import LoginForm from './LoginForm';

import {
  setIsLogin,
  clearLoginFields,
  requestLogin,
  requestSignUp,
  checkSignUpValid,
  checkInvalidMessageClear,
  changeLoginFields,
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

  const isButtonActive = useSelector(get({
    page: 'login',
    key: 'isButtonActive',
  }));

  const handleClickToggle = useCallback(() => {
    dispatch(setIsLogin());
    dispatch(clearLoginFields());
  }, [dispatch]);

  const handleChange = useCallback(({
    name, value,
  }) => {
    dispatch(changeLoginFields({ name, value }));
    dispatch(checkInvalidMessageClear({ name, value }));
  }, [dispatch]);

  const handleCheckSignUpValid = useCallback(({
    name, value,
  }) => {
    dispatch(checkSignUpValid({ name, value }));
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
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
        isButtonActive={isButtonActive}
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
