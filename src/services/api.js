const API_KEY = process.env.REACT_APP_API_KEY;

export async function postRefreshToken(refreshToken) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`
  + `&grant_type=refresh_token&refresh_token=${refreshToken}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { id_token: idToken, user_id: uid } = await response.json();

  return { idToken, uid };
}

export async function postLogin({ email, password }) {
  const url = 'https://identitytoolkit.googleapis.com/'
  + `v1/accounts:signInWithPassword?key=${API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  const { refreshToken, localId } = data;

  console.log(`refreshToken: ${refreshToken}`);
  console.log(`localId: ${localId}`);

  return {
    refreshToken, localId,
  };
}

export async function postSignup() {
  // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
}
