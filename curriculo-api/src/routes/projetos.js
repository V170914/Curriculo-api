const express = require('express');
const crud = require('../crud');
const db = require('../db');
const { HttpError, wrap } = require('../errors');

const router = express.Router();

async function garantirProjeto(id) {
  const { rows } = await db.query('SELECT id FROM projetos WHERE id = $1', [id]);
  if (!rows.length) throw new HttpError(404, 'Projeto não encontrado.');
}

// ---------- Relacionamento N:N projeto <-> habilidades ----------
router.get('/:id/habilidades', wrap(async (req, res) => {
  await garantirProjeto(req.params.id);
  const { rows } = await db.query(
    `SELECT h.* FROM projetos_habilidades x JOIN habilidades h ON h.id = x.habilidade_id
      WHERE x.projeto_id = $1 ORDER BY h.nome`,
    [req.params.id],
  );
  res.json(rows);
}));

router.post('/:id/habilidades', wrap(async (req, res) => {
  const { habilidade_id } = req.body || {};
  if (!habilidade_id) throw new HttpError(400, 'Campo obrigatório ausente: habilidade_id.');
  await garantirProjeto(req.params.id);
  const { rows } = await db.query(
    `INSERT INTO projetos_habilidades (projeto_id, habilidade_id) VALUES ($1, $2)
     ON CONFLICT DO NOTHING RETURNING *`,
    [req.params.id, habilidade_id],
  );
  if (!rows.length) throw new HttpError(409, 'Essa habilidade já está vinculada ao projeto.');
  res.status(201).json(rows[0]);
}));

router.delete('/:id/habilidades/:habilidadeId', wrap(async (req, res) => {
  const { rows } = await db.query(
    'DELETE FROM projetos_habilidades WHERE projeto_id = $1 AND habilidade_id = $2 RETURNING *',
    [req.params.id, req.params.habilidadeId],
  );
  if (!rows.length) throw new HttpError(404, 'Vínculo projeto/habilidade não encontrado.');
  res.json({ mensagem: 'Habilidade desvinculada do projeto.', removido: rows[0] });
}));

router.use('/', crud({
  table: 'projetos',
  label: 'Projeto',
  fields: ['pessoa_id', 'titulo', 'descricao', 'link_repositorio', 'link_deploy'],
  required: ['pessoa_id', 'titulo'],
  filters: ['pessoa_id'],
}));

module.exports = router;
