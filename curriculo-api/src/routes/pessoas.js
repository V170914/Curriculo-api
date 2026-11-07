const express = require('express');
const crud = require('../crud');
const db = require('../db');
const { HttpError, wrap } = require('../errors');

const router = express.Router();

async function garantirPessoa(id) {
  const { rows } = await db.query('SELECT * FROM pessoas WHERE id = $1', [id]);
  if (!rows.length) throw new HttpError(404, 'Pessoa não encontrada.');
  return rows[0];
}

// ---------- Relacionamentos 1:N (listas filtradas por pessoa) ----------
const filhos = {
  formacoes: 'data_inicio DESC',
  experiencias: 'data_inicio DESC',
  projetos: 'id',
  idiomas: 'id',
};
for (const [nome, ordem] of Object.entries(filhos)) {
  router.get(`/:id/${nome}`, wrap(async (req, res) => {
    await garantirPessoa(req.params.id);
    const { rows } = await db.query(`SELECT * FROM ${nome} WHERE pessoa_id = $1 ORDER BY ${ordem}`, [req.params.id]);
    res.json(rows);
  }));
}

// ---------- Relacionamento N:N pessoa <-> habilidades ----------
router.get('/:id/habilidades', wrap(async (req, res) => {
  await garantirPessoa(req.params.id);
  const { rows } = await db.query(
    `SELECT h.id, h.nome, h.categoria, ph.nivel
       FROM pessoas_habilidades ph JOIN habilidades h ON h.id = ph.habilidade_id
      WHERE ph.pessoa_id = $1 ORDER BY h.nome`,
    [req.params.id],
  );
  res.json(rows);
}));

router.post('/:id/habilidades', wrap(async (req, res) => {
  const { habilidade_id, nivel } = req.body || {};
  if (!habilidade_id) throw new HttpError(400, 'Campo obrigatório ausente: habilidade_id.');
  await garantirPessoa(req.params.id);
  const { rows } = await db.query(
    `INSERT INTO pessoas_habilidades (pessoa_id, habilidade_id, nivel) VALUES ($1, $2, $3)
     ON CONFLICT (pessoa_id, habilidade_id) DO UPDATE SET nivel = EXCLUDED.nivel RETURNING *`,
    [req.params.id, habilidade_id, nivel ?? null],
  );
  res.status(201).json(rows[0]);
}));

router.delete('/:id/habilidades/:habilidadeId', wrap(async (req, res) => {
  const { rows } = await db.query(
    'DELETE FROM pessoas_habilidades WHERE pessoa_id = $1 AND habilidade_id = $2 RETURNING *',
    [req.params.id, req.params.habilidadeId],
  );
  if (!rows.length) throw new HttpError(404, 'Vínculo pessoa/habilidade não encontrado.');
  res.json({ mensagem: 'Habilidade desvinculada da pessoa.', removido: rows[0] });
}));

// ---------- Currículo completo em um único JSON ----------
router.get('/:id/curriculo', wrap(async (req, res) => {
  const pessoa = await garantirPessoa(req.params.id);
  const id = req.params.id;
  const [formacoes, experiencias, projetos, idiomas, habilidades] = await Promise.all([
    db.query('SELECT * FROM formacoes WHERE pessoa_id = $1 ORDER BY data_inicio DESC', [id]),
    db.query('SELECT * FROM experiencias WHERE pessoa_id = $1 ORDER BY data_inicio DESC', [id]),
    db.query(
      `SELECT p.*, COALESCE((SELECT json_agg(h.nome ORDER BY h.nome)
                               FROM projetos_habilidades x JOIN habilidades h ON h.id = x.habilidade_id
                              WHERE x.projeto_id = p.id), '[]'::json) AS habilidades
         FROM projetos p WHERE p.pessoa_id = $1 ORDER BY p.id`, [id]),
    db.query('SELECT * FROM idiomas WHERE pessoa_id = $1 ORDER BY id', [id]),
    db.query(
      `SELECT h.id, h.nome, h.categoria, ph.nivel
         FROM pessoas_habilidades ph JOIN habilidades h ON h.id = ph.habilidade_id
        WHERE ph.pessoa_id = $1 ORDER BY h.nome`, [id]),
  ]);
  res.json({
    ...pessoa,
    formacoes: formacoes.rows,
    experiencias: experiencias.rows,
    projetos: projetos.rows,
    idiomas: idiomas.rows,
    habilidades: habilidades.rows,
  });
}));

// ---------- CRUD básico da pessoa ----------
router.use('/', crud({
  table: 'pessoas',
  label: 'Pessoa',
  fields: ['nome', 'email', 'telefone', 'cidade', 'resumo', 'linkedin', 'github'],
  required: ['nome', 'email'],
}));

module.exports = router;
