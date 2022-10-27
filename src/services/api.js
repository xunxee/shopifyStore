export async function postLogin({ email, password }) {
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await response.json();
  return accessToken;
}

export async function postSignup() {
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';
}
