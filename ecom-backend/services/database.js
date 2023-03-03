const { Pool } = require("pg");

const POSTGRES_URL = process.env.POSTGRES_URL; // 'postgres://postgres:<ditt passord>@localhost:5432/<ditt database navn>';

const database = new Pool({
  connectionString: POSTGRES_URL,
});
// A database for an ecommerce website


function getProducts() {
  return database.query("SELECT * FROM products");
}


