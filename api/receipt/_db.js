const { Pool } = require("pg");

let pool;

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString =
    process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL or POSTGRES_URL_NON_POOLING is not set.");
  }

  pool = new Pool({
    connectionString,
    max: 1,
    ssl: { rejectUnauthorized: false },
  });

  return pool;
}

async function query(text, params) {
  return getPool().query(text, params);
}

module.exports = { query };
