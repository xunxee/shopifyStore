import { memo } from 'react';

export default memo(({
  isLogin,
  fields,
  onClick,
  onChange,
}) => {
  const {
    email, password, firstName, lastName,
  } = fields;

  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
  }

  return (
    <form>
      {isLogin || (
        <>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
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
      <button type="submit">
        {isLogin ? 'Log In' : 'Sign Up'}
      </button>
      <p>
        {isLogin
          ? "Don't have an account?"
          : 'Passwords must be longer than 7 chars and include numbers'}
      </p>
      <button
        type="button"
        onClick={onClick}
      >
        {isLogin ? 'Sign Up' : 'Log In' }
      </button>
    </form>
  );
});
