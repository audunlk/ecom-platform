const ELIXIR_URL = process.env.ELIXIR_URL || 'http://localhost:3333';


export async function getProducts() {
  const response = await fetch(`${ELIXIR_URL}/products`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
    });
    const data = await response.json();
    return data;
}
    