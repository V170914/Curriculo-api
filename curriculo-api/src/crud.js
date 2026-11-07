const express = require('express');
const db = require('./db');
const { HttpError, wrap } = require('./errors');

/**
 * Gera um CRUD completo para uma tabela.
 *  GET    /        lista (aceita filtros via query string, ex.: ?pessoa_id=1)
 *  GET    /:id     busca um
 *  POST   /        cria
 *  PUT    /:id     atualiza (apenas os campos enviados)
 *  DELETE /:id     remove
 */
module.exports = function crud({ table, label, fields, required = [], filters = [], orderBy = 'id' }) {
  const router = express.Router();

  router.get('/', wrap(async (req, res) => {
    const conds = [];
    const vals = [];
    for (const f of filters) {
      if (req.query[f] !== undefined) {
        vals.push(req.query[f]);
        conds.push(`${f} = $${vals.length}`);
      }
    }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    const { rows } = await db.query(`SELECT * FROM ${table} ${where} ORDER BY ${orderBy}`, vals);
    res.json(rows);
  }));

  router.get('/:id', wrap(async (req, res) => {
    const { rows } = await db.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id]);
    if (!rows.length) throw new HttpError(404, `${label}: registro não encontrado.`);
    res.json(rows[0]);
  }));

  router.post('/', wrap(async (req, res) => {
    const body = req.body || {};
    const missing = required.filter((f) => body[f] === undefined || body[f] === null || body[f] === '');
    if (missing.length) throw new HttpError(400, `Campos obrigatórios ausentes: ${missing.join(', ')}.`);

    const cols = fields.filter((f) => body[f] !== undefined);
    const vals = cols.map((c) => body[c]);
    const placeholders = cols.map((_, i) => `$${i + 1}`);
    const { rows } = await db.query(
      `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
      vals,
    );
    res.status(201).json(rows[0]);
  }));

  router.put('/:id', wrap(async (req, res) => {
    const body = req.body || {};
    const cols = fields.filter((f) => body[f] !== undefined);
    if (!cols.length) throw new HttpError(400, `Envie ao menos um campo para atualizar: ${fields.join(', ')}.`);

    const sets = cols.map((c, i) => `${c} = $${i + 1}`);
    const vals = cols.map((c) => body[c]);
    vals.push(req.params.id);
    const { rows } = await db.query(
      `UPDATE ${table} SET ${sets.join(', ')} WHERE id = $${vals.length} RETURNING *`,
      vals,
    );
    if (!rows.length) throw new HttpError(404, `${label}: registro não encontrado.`);
    res.json(rows[0]);
  }));

  router.delete('/:id', wrap(async (req, res) => {
    const { rows } = await db.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [req.params.id]);
    if (!rows.length) throw new HttpError(404, `${label}: registro não encontrado.`);
    res.json({ mensagem: `${label}: registro removido com sucesso.`, removido: rows[0] });
  }));

  return router;
};
