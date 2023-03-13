const API_KEY = process.env.REACT_APP_API_KEY;

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

  return {
    refreshToken,
    localId,
  };
}

export async function postSignUp({ email, password }) {
  const url = 'https://identitytoolkit.googleapis.com/'
    + `v1/accounts:signUp?key=${API_KEY}`;

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

  return {
    refreshToken,
    localId,
  };
}

export async function fetchMockProductList() {
  // TODO: mock_data와의 연결
  const url = '/productList.json';
  // const url = '/api/productList';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchMockProduct() {
  // TODO: mock_data와의 연결
  const url = '/product.json';
  // const url = '/api/product';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchMockHomePageProductList() {
  // TODO: mock_data와의 연결
  const url = '/homePage.json';
  // const url = '/api/product';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
