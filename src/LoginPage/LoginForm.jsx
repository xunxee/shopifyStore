import { memo } from 'react';

export default memo(({
  isLogin,
  fields: {
    email, password, firstName, lastName, error,
  },
  onChange,
  onSubmit,
}) => {
  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
  }

  return (
    <form onSubmit={onSubmit}>
      {error && <p>{error}</p>}
      {isLogin || (
        <>
          <input
            name="lastName"
            type="text"
            placeholder="성(Last Name)"
            value={lastName}
            onChange={handleChange}
          />
          <input
            name="firstName"
            type="text"
            placeholder="이름(First Name)"
            value={firstName}
            onChange={handleChange}
          />
        </>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
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
    </form>
  );
});
