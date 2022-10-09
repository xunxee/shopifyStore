export default function LoginForm({ onClick }) {
  return ((
    <form>
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
      <button type="submit">Log In</button>
      <p>Don&apos;t have an account?</p>
      <button
        type="button"
        onClick={onClick}
      >
        Sign Up
      </button>
    </form>
  ));
}
