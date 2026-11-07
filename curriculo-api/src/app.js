require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crud = require('./crud');
const { errorHandler } = require('./errors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    api: 'API de Currículo (Express + PostgreSQL/NeonDB)',
    recursos: {
      pessoas: '/pessoas',
      formacoes: '/formacoes',
      experiencias: '/experiencias',
      projetos: '/projetos',
      idiomas: '/idiomas',
      habilidades: '/habilidades',
    },
    relacionamentos: [
      'GET /pessoas/:id/curriculo',
      'GET /pessoas/:id/{formacoes|experiencias|projetos|idiomas|habilidades}',
      'POST|DELETE /pessoas/:id/habilidades[/:habilidadeId]',
      'GET|POST|DELETE /projetos/:id/habilidades[/:habilidadeId]',
      'GET /habilidades/:id/{pessoas|projetos}',
    ],
  });
});

app.use('/pessoas', require('./routes/pessoas'));
app.use('/projetos', require('./routes/projetos'));
app.use('/habilidades', require('./routes/habilidades'));

app.use('/formacoes', crud({
  table: 'formacoes',
  label: 'Formação',
  fields: ['pessoa_id', 'instituicao', 'curso', 'nivel', 'data_inicio', 'data_fim', 'descricao'],
  required: ['pessoa_id', 'instituicao', 'curso', 'data_inicio'],
  filters: ['pessoa_id'],
  orderBy: 'data_inicio DESC',
}));

app.use('/experiencias', crud({
  table: 'experiencias',
  label: 'Experiência',
  fields: ['pessoa_id', 'empresa', 'cargo', 'descricao', 'data_inicio', 'data_fim', 'atual'],
  required: ['pessoa_id', 'empresa', 'cargo', 'data_inicio'],
  filters: ['pessoa_id'],
  orderBy: 'data_inicio DESC',
}));

app.use('/idiomas', crud({
  table: 'idiomas',
  label: 'Idioma',
  fields: ['pessoa_id', 'idioma', 'nivel'],
  required: ['pessoa_id', 'idioma', 'nivel'],
  filters: ['pessoa_id'],
}));

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));
app.use(errorHandler);

module.exports = app;
