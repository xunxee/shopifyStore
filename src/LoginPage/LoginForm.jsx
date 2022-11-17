import styled from '@emotion/styled';

import { memo } from 'react';

const Container = styled.form({
  display: 'flex',
  flexDirection: 'column',
});

export default memo(({
  isLogin,
  fields: {
    email: {
      value: emailValue,
      invalidCheckMessage: emailInvalidCheckMessage,
    },
    password: {
      value: passwordValue,
      invalidCheckMessage: passwordInvalidCheckMessage,
    },
    firstName: {
      value: firstNameValue,
      invalidCheckMessage: firstNameInvalidCheckMessage,
    },
    lastName: {
      value: lastNameValue,
      invalidCheckMessage: lastNameInvalidCheckMessage,
    },
    error,
  },
  onChange,
  onBlur,
  onSubmit,
}) => {
  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
  }

  function handleSignUpValid({ target: { name } }) {
    onBlur(name);
  }

  return (
    <>
      {error && <p>{error}</p>}
      <Container onSubmit={onSubmit}>
        {isLogin || (
          <>
            <input
              name="lastName"
              type="text"
              placeholder="성(Last Name)"
              value={lastNameValue}
              onChange={handleChange}
              onBlur={handleSignUpValid}
            />
            {lastNameInvalidCheckMessage
              && <p>{lastNameInvalidCheckMessage}</p>}
            <input
              name="firstName"
              type="text"
              placeholder="이름(First Name)"
              value={firstNameValue}
              onChange={handleChange}
              onBlur={handleSignUpValid}
            />
            {firstNameInvalidCheckMessage
              && <p>{firstNameInvalidCheckMessage}</p>}
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={emailValue}
          onChange={handleChange}
          onBlur={isLogin ? null : handleSignUpValid}
        />
        {isLogin ? null
          : emailInvalidCheckMessage
          && <p>{emailInvalidCheckMessage}</p>}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={passwordValue}
          autoComplete="off"
          onChange={handleChange}
          onBlur={isLogin ? null : handleSignUpValid}
        />
        {isLogin ? null
          : passwordInvalidCheckMessage
          && <p>{passwordInvalidCheckMessage}</p>}
        <button
          type="submit"
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
