const ELIXIR_URL = process.env.ELIXIR_URL || 'http://localhost:3333';


export async function registerUser (user) {
  const response = await fetch(`${ELIXIR_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {
            email: user.email,
            password: user.password,
        }
    )
  });
  const data = await response.json();
  return data;
}

export async function loginUser (user) {
    const { email, password } = user;
    const response = await fetch(`${ELIXIR_URL}/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                email,
                password
            }
        )
    });
    const data = await response.json();
    return data;
    }