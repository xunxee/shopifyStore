import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import ControlMemberForm from './ControlMemberForm';

import {
  setIsLogin,
  clearLoginFields,
  requestLogin,
  requestSignUp,
  checkSignUpValid,
  checkInvalidMessageClear,
  changeLoginFields,
  setButtonActive,
} from './slice';

export default function ControlMemberContainer() {
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
    dispatch(setButtonActive(false));
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
    if (isButtonActive) return;

    dispatch(checkSignUpValid({ name, value }));
  }, [dispatch, isButtonActive]);

  const handleSubmit = useCallback(() => {
    if (isLogin) {
      dispatch(requestLogin());
      return;
    }

    dispatch(requestSignUp());
  }, [dispatch, isLogin]);

  return (
    <div>
      <ControlMemberForm
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
