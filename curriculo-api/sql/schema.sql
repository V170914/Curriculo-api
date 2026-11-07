-- Recria o esquema do zero (cuidado: apaga os dados existentes).
DROP TABLE IF EXISTS projetos_habilidades, pessoas_habilidades, idiomas, projetos,
                     experiencias, formacoes, habilidades, pessoas CASCADE;

CREATE TABLE pessoas (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(120) NOT NULL,
  email     VARCHAR(160) NOT NULL UNIQUE,
  telefone  VARCHAR(30),
  cidade    VARCHAR(100),
  resumo    TEXT,
  linkedin  VARCHAR(255),
  github    VARCHAR(255),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE formacoes (
  id          SERIAL PRIMARY KEY,
  pessoa_id   INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  instituicao VARCHAR(160) NOT NULL,
  curso       VARCHAR(160) NOT NULL,
  nivel       VARCHAR(60),
  data_inicio DATE NOT NULL,
  data_fim    DATE,
  descricao   TEXT
);

CREATE TABLE experiencias (
  id          SERIAL PRIMARY KEY,
  pessoa_id   INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  empresa     VARCHAR(160) NOT NULL,
  cargo       VARCHAR(120) NOT NULL,
  descricao   TEXT,
  data_inicio DATE NOT NULL,
  data_fim    DATE,
  atual       BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE projetos (
  id               SERIAL PRIMARY KEY,
  pessoa_id        INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  titulo           VARCHAR(160) NOT NULL,
  descricao        TEXT,
  link_repositorio VARCHAR(255),
  link_deploy      VARCHAR(255)
);

CREATE TABLE idiomas (
  id        SERIAL PRIMARY KEY,
  pessoa_id INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  idioma    VARCHAR(60) NOT NULL,
  nivel     VARCHAR(60) NOT NULL
);

CREATE TABLE habilidades (
  id        SERIAL PRIMARY KEY,
  nome      VARCHAR(80) NOT NULL UNIQUE,
  categoria VARCHAR(60)
);

-- N:N pessoa <-> habilidade
CREATE TABLE pessoas_habilidades (
  pessoa_id     INTEGER NOT NULL REFERENCES pessoas(id) ON DELETE CASCADE,
  habilidade_id INTEGER NOT NULL REFERENCES habilidades(id) ON DELETE CASCADE,
  nivel         VARCHAR(40),
  PRIMARY KEY (pessoa_id, habilidade_id)
);

-- N:N projeto <-> habilidade
CREATE TABLE projetos_habilidades (
  projeto_id    INTEGER NOT NULL REFERENCES projetos(id) ON DELETE CASCADE,
  habilidade_id INTEGER NOT NULL REFERENCES habilidades(id) ON DELETE CASCADE,
  PRIMARY KEY (projeto_id, habilidade_id)
);
