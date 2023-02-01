import styled from '@emotion/styled';

import { memo } from 'react';

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
  isButtonActive,
  onChange,
  onBlur,
  onSubmit,
}) => {
  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
  }

  function handleSignUpValid({ target: { name, value } }) {
    onBlur({ name, value });
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
            {lastName.validationMessage
              && <p>{lastName.validationMessage}</p>}
            <input
              name="firstName"
              type="text"
              placeholder="이름(First Name)"
              value={firstName.value}
              onChange={handleChange}
              onBlur={handleSignUpValid}
            />
            {firstName.validationMessage
              && <p>{firstName.validationMessage}</p>}
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
          : email.validationMessage
          && <p>{email.validationMessage}</p>}
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
          : password.validationMessage
          && <p>{password.validationMessage}</p>}
        <button
          type="submit"
          disabled={!isButtonActive}
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
