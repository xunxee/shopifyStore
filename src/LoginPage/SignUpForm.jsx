export default function SignUpForm({ onClick }) {
  return ((
    <form>
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
      <input
        type="email"
        placeholder="Email"
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="off"
      />
      <button type="submit">Sign up</button>
      <p>Passwords must be longer than 7 chars and include numbers</p>
      <button
        type="button"
        onClick={onClick}
      >
        Log In
      </button>
    </form>
  ));
}
