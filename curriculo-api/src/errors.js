class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Encaminha erros de funções async para o middleware de erro do Express.
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof HttpError) return res.status(err.status).json({ erro: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ erro: 'JSON inválido no corpo da requisição.' });

  switch (err.code) {
    case '23503': return res.status(400).json({ erro: 'Referência inválida: o registro relacionado não existe (ou ainda está sendo usado).', detalhe: err.detail });
    case '23505': return res.status(409).json({ erro: 'Registro duplicado.', detalhe: err.detail });
    case '23502': return res.status(400).json({ erro: `Campo obrigatório ausente: ${err.column}.` });
    case '22P02':
    case '22007':
    case '22003':
    case '22008': return res.status(400).json({ erro: 'Valor inválido em um dos campos (id, data ou número).' });
    default:
      console.error(err);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { HttpError, wrap, errorHandler };
