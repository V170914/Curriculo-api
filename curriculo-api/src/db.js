require('dotenv').config();
const { Pool, types } = require('pg');

// Retorna colunas DATE como string 'YYYY-MM-DD' (evita problemas de fuso horário).
types.setTypeParser(1082, (v) => v);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  max: 5,
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
