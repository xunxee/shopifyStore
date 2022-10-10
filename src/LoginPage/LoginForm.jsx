import { memo } from 'react';

export default memo(({ onClick, isLogin }) => ((
  <form>
    {isLogin ? null : (
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
    />
    <input
      name="password"
      type="password"
      placeholder="Password"
      autoComplete="off"
    />
    {isLogin ? (
      <button type="submit">Log In</button>)
      : (<button type="submit">Sign Up</button>)}

    {isLogin ? (<p>Don&apos;t have an account?</p>) : (
      <p>
        Passwords must be longer than 7 chars and include numbers
      </p>
    )}
    <button
      type="button"
      onClick={onClick}
    >
      {isLogin ? 'Sign Up' : 'Log In' }
    </button>
  </form>
)));
