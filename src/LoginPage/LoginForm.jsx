import { memo } from 'react';

export default memo(({ isLogin, onClick, onChange }) => {
  function handleChange({ target: { name, value } }) {
    onChange({ name, value });
  }

  return (
    <form>
      {isLogin && (
        <>
          <input
            name="first"
            type="text"
            placeholder="First Name"
          />
          <input
            name="last"
            type="text"
            placeholder="Last Name"
          />
        </>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="off"
        onChange={handleChange}
      />
      <button type="submit">
        {isLogin ? 'Log In' : 'Sign up'}
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
