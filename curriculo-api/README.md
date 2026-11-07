# API de Currículo — Express + PostgreSQL (NeonDB)

API REST com CRUD completo para os dados de um currículo: pessoas, formações, experiências, projetos, idiomas e habilidades, com relacionamentos 1:N e N:N.

## Modelo de dados

```
pessoas 1──N formacoes
        1──N experiencias
        1──N projetos
        1──N idiomas
        N──N habilidades   (pessoas_habilidades, com campo "nivel")
projetos N──N habilidades  (projetos_habilidades)
```

Ao deletar uma pessoa, tudo que pertence a ela é removido em cascata.

## Endpoints

| Recurso | Rotas (CRUD completo) |
|---|---|
| Pessoas | `GET/POST /pessoas` · `GET/PUT/DELETE /pessoas/:id` |
| Formações | `GET/POST /formacoes` · `GET/PUT/DELETE /formacoes/:id` (filtro `?pessoa_id=`) |
| Experiências | `GET/POST /experiencias` · `GET/PUT/DELETE /experiencias/:id` (filtro `?pessoa_id=`) |
| Projetos | `GET/POST /projetos` · `GET/PUT/DELETE /projetos/:id` (filtro `?pessoa_id=`) |
| Idiomas | `GET/POST /idiomas` · `GET/PUT/DELETE /idiomas/:id` (filtro `?pessoa_id=`) |
| Habilidades | `GET/POST /habilidades` · `GET/PUT/DELETE /habilidades/:id` |

**Relacionamentos**

| Rota | O que faz |
|---|---|
| `GET /pessoas/:id/curriculo` | Currículo completo em um JSON |
| `GET /pessoas/:id/{formacoes,experiencias,projetos,idiomas}` | Itens (1:N) de uma pessoa |
| `GET/POST /pessoas/:id/habilidades` | Lista / vincula habilidade (`{"habilidade_id":1,"nivel":"Avançado"}`) |
| `DELETE /pessoas/:id/habilidades/:habilidadeId` | Desvincula |
| `GET/POST /projetos/:id/habilidades` | Lista / vincula habilidade ao projeto (`{"habilidade_id":1}`) |
| `DELETE /projetos/:id/habilidades/:habilidadeId` | Desvincula |
| `GET /habilidades/:id/pessoas` · `/projetos` | Lado inverso do N:N |

`PUT` atualiza apenas os campos enviados.

## Rodando localmente

```bash
npm install
cp .env.example .env      # preencha DATABASE_URL com a string do NeonDB
npm run db:setup          # cria as tabelas e carrega 2 currículos
npm run dev               # http://localhost:3000
```

## Publicando

1. **NeonDB**: crie um projeto em neon.tech e copie a *connection string*. Rode `npm run db:setup` com ela no `.env` (ou cole `sql/schema.sql` e depois `sql/seed.sql` no SQL Editor do Neon).
2. **GitHub**: suba este código.
3. **Vercel**: *Add New Project* → importe o repositório → em *Environment Variables* crie `DATABASE_URL` com a string do Neon → *Deploy*.
4. **Postman**: importe `postman/Curriculo-API.postman_collection.json` e troque a variável `baseUrl` pela URL da Vercel.

## Dados cadastrados

- Pessoa 1: Vitória Inácia
- Pessoa 2: Lucas Almeida (personagem fictício)
