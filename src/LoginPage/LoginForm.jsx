import styled from '@emotion/styled';

import { memo } from 'react';

import VALID_FIELDS from '../../fixtures/validFields';

const Container = styled.form({
  display: 'flex',
  flexDirection: 'column',
});

export default memo(({
  isLogin,
  fields: {
    email,
    password,
    firstName,
    lastName,
    error,
  },
  onChange,
  onBlur,
  onSubmit,
}) => {
  function checkDisabled() {
    if (isLogin) return email.value && password.value;

    if (!(email.value && password.value
      && firstName.value && lastName.value)) return false;

    if (email.invalidCheckMessage
      && password.invalidCheckMessage) return false;

    const emailValidCheck = VALID_FIELDS.email.regexps
      .test(email.value);

    const passwordValidCheck = VALID_FIELDS.password.regexps
      .test(password.value);

    return (lastName.value && firstName.value
      && emailValidCheck && passwordValidCheck);
  }

  function handleChange({ target: { name, value } }) {
    onChange({
      name, value, email, password,
    });
  }

  function handleSignUpValid({ target: { name } }) {
    onBlur({ name });
  }

  function handleSubmit() {
    return (event) => {
      event.preventDefault();

      onSubmit();
    };
  }

  return (
    <>
      {error && <p>{error}</p>}
      <Container onSubmit={handleSubmit()}>
        {isLogin || (
          <>
            <input
              name="lastName"
              type="text"
              placeholder="성(Last Name)"
              value={lastName.value}
              onChange={handleChange}
              onBlur={handleSignUpValid}
            />
            {lastName.invalidCheckMessage
              && <p>{lastName.invalidCheckMessage}</p>}
            <input
              name="firstName"
              type="text"
              placeholder="이름(First Name)"
              value={firstName.value}
              onChange={handleChange}
              onBlur={handleSignUpValid}
            />
            {firstName.invalidCheckMessage
              && <p>{firstName.invalidCheckMessage}</p>}
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email.value}
          onChange={handleChange}
          onBlur={isLogin ? null : handleSignUpValid}
        />
        {isLogin ? null
          : email.invalidCheckMessage
          && <p>{email.invalidCheckMessage}</p>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password.value}
          autoComplete="off"
          onChange={handleChange}
          onBlur={isLogin ? null : handleSignUpValid}
        />
        {isLogin ? null
          : password.invalidCheckMessage
          && <p>{password.invalidCheckMessage}</p>}
        <button
          type="submit"
          disabled={!checkDisabled()}
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
        <p>
          {isLogin
            ? "Don't have an account?"
            : 'Passwords must be longer than 7 chars and include numbers'}
        </p>
      </Container>
    </>
  );
});
