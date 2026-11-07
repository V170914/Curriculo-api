// Cria as tabelas e popula os dados de exemplo no banco apontado por DATABASE_URL.
// Uso: npm run db:setup
const fs = require('fs');
const path = require('path');
const db = require('../src/db');

(async () => {
  try {
    for (const file of ['schema.sql', 'seed.sql']) {
      const sql = fs.readFileSync(path.join(__dirname, '..', 'sql', file), 'utf8');
      await db.query(sql);
      console.log(`✔ ${file} executado`);
    }
  } catch (err) {
    console.error('Erro ao preparar o banco:', err.message);
    process.exitCode = 1;
  } finally {
    await db.pool.end();
  }
})();
