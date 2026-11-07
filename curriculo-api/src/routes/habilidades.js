const express = require('express');
const crud = require('../crud');
const db = require('../db');
const { wrap } = require('../errors');

const router = express.Router();

// Lado inverso das relações N:N
router.get('/:id/pessoas', wrap(async (req, res) => {
  const { rows } = await db.query(
    `SELECT p.id, p.nome, ph.nivel FROM pessoas_habilidades ph JOIN pessoas p ON p.id = ph.pessoa_id
      WHERE ph.habilidade_id = $1 ORDER BY p.nome`,
    [req.params.id],
  );
  res.json(rows);
}));

router.get('/:id/projetos', wrap(async (req, res) => {
  const { rows } = await db.query(
    `SELECT p.id, p.titulo, p.pessoa_id FROM projetos_habilidades x JOIN projetos p ON p.id = x.projeto_id
      WHERE x.habilidade_id = $1 ORDER BY p.titulo`,
    [req.params.id],
  );
  res.json(rows);
}));

router.use('/', crud({
  table: 'habilidades',
  label: 'Habilidade',
  fields: ['nome', 'categoria'],
  required: ['nome'],
  orderBy: 'nome',
}));

module.exports = router;
