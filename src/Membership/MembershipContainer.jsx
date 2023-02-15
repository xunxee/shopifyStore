import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../utils';

import MembershipForm from './MemberShipForm';

import {
  setIsLogin,
  clearAccountFields,
  requestLogin,
  requestSignUp,
  checkInputValue,
  checkMemberInfo,
  changeAccountFields,
  setButtonActive,
} from './slice';

export default function MembershipContainer() {
  const dispatch = useDispatch();

  const isLogin = useSelector(
    get({
      page: 'membership',
      key: 'isLogin',
    }),
  );

  const accountFields = useSelector(
    get({
      page: 'membership',
      key: 'accountFields',
    }),
  );

  const isButtonActive = useSelector(
    get({
      page: 'membership',
      key: 'isButtonActive',
    }),
  );

  const handleClickToggle = useCallback(() => {
    dispatch(setIsLogin());
    dispatch(clearAccountFields());
    dispatch(setButtonActive(false));
  }, [dispatch]);

  const handleChange = useCallback(
    ({ name, value }) => {
      dispatch(changeAccountFields({ name, value }));
      dispatch(checkMemberInfo({ name, value }));
    },
    [dispatch],
  );

  const handleBlur = useCallback(
    ({ name, value }) => {
      if (isButtonActive) return;

      dispatch(checkInputValue({ name, value }));
    },
    [dispatch, isButtonActive],
  );

  const handleSubmit = useCallback(() => {
    if (isLogin) {
      dispatch(requestLogin());
      return;
    }

    dispatch(requestSignUp());
  }, [dispatch, isLogin]);

  return (
    <div>
      <MembershipForm
        isLogin={isLogin}
        fields={accountFields}
        isButtonActive={isButtonActive}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      />
      <button type="button" onClick={handleClickToggle}>
        {isLogin ? 'Sign Up' : 'Log In'}
      </button>
    </div>
  );
}
