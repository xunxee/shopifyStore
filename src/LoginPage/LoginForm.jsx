import styled from '@emotion/styled';

import { memo } from 'react';

const Container = styled.form({
  display: 'flex',
  flexDirection: 'column',
});

export default memo(({
  isLogin,
  fields: {
    email: { value: emailValue },
    password: { value: passwordValue },
    firstName: { value: firstNameValue },
    lastName: { value: lastNameValue },
    error,
  },
  onChange,
  onBlur,
  onSubmit,
}) => {
  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
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
              // onBlur={onBlur}
              onBlur={onBlur}
            />
            <input
              name="firstName"
              type="text"
              placeholder="이름(First Name)"
              value={firstNameValue}
              onChange={handleChange}
            />
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={emailValue}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={passwordValue}
          autoComplete="off"
          onChange={handleChange}
        />
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
