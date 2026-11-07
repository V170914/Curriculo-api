-- ===== PESSOA 1: Vitória Inácia (dados reais; ajuste os marcados com [AJUSTAR]) =====
INSERT INTO pessoas (nome, email, telefone, cidade, resumo, linkedin, github) VALUES
('Vitória Inácia',
 'vitoria.inacia@example.com',                    -- [AJUSTAR] seu e-mail real
 NULL,                                            -- [AJUSTAR] telefone (opcional)
 'Recife, PE',                                    -- [AJUSTAR] cidade
 'Desenvolvedora Backend Java na Capgemini, atuando em sistemas bancários. Estudante de Sistemas para Internet na Universidade Católica de Pernambuco, com experiência prévia como jovem aprendiz de TI e do setor jurídico.',
 NULL,                                            -- [AJUSTAR] URL do LinkedIn
 'https://github.com/V170914');

INSERT INTO formacoes (pessoa_id, instituicao, curso, nivel, data_inicio, data_fim, descricao) VALUES
(1, 'Universidade Católica de Pernambuco', 'Sistemas para Internet', 'Tecnólogo', '2024-02-01', NULL,   -- [AJUSTAR] datas
 'Graduação tecnológica em andamento.');

INSERT INTO experiencias (pessoa_id, empresa, cargo, descricao, data_inicio, data_fim, atual) VALUES
(1, 'Capgemini', 'Desenvolvedora Backend Java',
 'Desenvolvimento de sistemas bancários em Java para um banco.', '2026-05-01', NULL, TRUE),                -- [AJUSTAR] data
(1, 'DAPAC - Universidade Católica de Pernambuco', 'Jovem Aprendiz de TI',
 'Atuação no setor de TI da DAPAC, setor da universidade.', '2023-01-01', '2023-12-31', FALSE),          -- [AJUSTAR] datas
(1, 'Empresa de transporte', 'Jovem Aprendiz - Setor Jurídico',
 'Apoio nas rotinas administrativas do setor jurídico.', '2022-01-01', '2022-12-31', FALSE);              -- [AJUSTAR] nome da empresa e datas

INSERT INTO idiomas (pessoa_id, idioma, nivel) VALUES
(1, 'Português', 'Nativo'),
(1, 'Inglês', 'B1');

INSERT INTO projetos (pessoa_id, titulo, descricao, link_repositorio, link_deploy) VALUES
(1, 'Passly', 'Guia turístico na palma da sua mão. Projeto desenvolvido na faculdade.',
 'https://github.com/V170914/Passly', NULL),
(1, 'Sistema de Cadastro', 'Sistema básico de cadastro.',
 'https://github.com/V170914/Sistema-deCadastro', NULL),
(1, 'Portfólio Profissional', 'Meu portfólio pessoal, publicado na Vercel.',
 'https://github.com/V170914/Portfolio-Vitoria-Inacia', 'https://portfolio-vitoria-inacia.vercel.app');

-- ===== PESSOA 2: Lucas Almeida (personagem fictício para a atividade) =====
INSERT INTO pessoas (nome, email, telefone, cidade, resumo, linkedin, github) VALUES
('Lucas Almeida', 'lucas.almeida@example.com', '(81) 90000-0000', 'Olinda, PE',
 'Desenvolvedor Front-end com foco em React e interfaces acessíveis. Gosta de transformar design em código limpo e performático.',
 'https://www.linkedin.com/in/lucas-almeida-exemplo', 'https://github.com/lucas-almeida-exemplo');

INSERT INTO formacoes (pessoa_id, instituicao, curso, nivel, data_inicio, data_fim, descricao) VALUES
(2, 'Universidade Federal de Pernambuco', 'Ciência da Computação', 'Bacharelado', '2019-02-01', '2023-12-15', 'Ênfase em engenharia de software e interação humano-computador.'),
(2, 'Alura', 'Formação React', 'Curso livre', '2022-03-01', '2022-09-30', 'Trilha completa de React, testes e acessibilidade.');

INSERT INTO experiencias (pessoa_id, empresa, cargo, descricao, data_inicio, data_fim, atual) VALUES
(2, 'Porto Digital Labs', 'Desenvolvedor Front-end Pleno', 'Desenvolvimento de dashboards em React e TypeScript, com foco em performance e testes.', '2024-03-01', NULL, TRUE),
(2, 'Startup Recife Tech', 'Desenvolvedor Front-end Júnior', 'Criação de componentes reutilizáveis e integração com APIs REST.', '2023-01-15', '2024-02-28', FALSE);

INSERT INTO idiomas (pessoa_id, idioma, nivel) VALUES
(2, 'Português', 'Nativo'),
(2, 'Inglês', 'C1'),
(2, 'Espanhol', 'A2');

INSERT INTO projetos (pessoa_id, titulo, descricao, link_repositorio, link_deploy) VALUES
(2, 'Task Board', 'Quadro kanban com arrastar e soltar.', 'https://github.com/lucas-almeida-exemplo/task-board', 'https://task-board-exemplo.vercel.app'),
(2, 'Clima Já', 'App de previsão do tempo consumindo API pública.', 'https://github.com/lucas-almeida-exemplo/clima-ja', NULL);

-- ===== Habilidades (compartilhadas) =====
INSERT INTO habilidades (nome, categoria) VALUES
('Java', 'Linguagem'),            -- 1
('JavaScript', 'Linguagem'),      -- 2
('TypeScript', 'Linguagem'),      -- 3
('SQL', 'Banco de dados'),        -- 4
('PostgreSQL', 'Banco de dados'), -- 5
('Node.js', 'Backend'),           -- 6
('Express', 'Backend'),           -- 7
('React', 'Frontend'),            -- 8
('Next.js', 'Frontend'),          -- 9
('Tailwind CSS', 'Frontend'),     -- 10
('Git/GitHub', 'Ferramentas');    -- 11

INSERT INTO pessoas_habilidades (pessoa_id, habilidade_id, nivel) VALUES
(1, 1, 'Avançado'), (1, 2, 'Intermediário'), (1, 3, 'Básico'), (1, 4, 'Intermediário'),
(1, 5, 'Básico'), (1, 6, 'Básico'), (1, 7, 'Básico'), (1, 9, 'Básico'), (1, 10, 'Básico'), (1, 11, 'Intermediário'),
(2, 2, 'Avançado'), (2, 3, 'Avançado'), (2, 8, 'Avançado'), (2, 9, 'Intermediário'), (2, 10, 'Avançado'), (2, 11, 'Avançado');

-- Projetos: 1 Passly, 2 Sistema de Cadastro, 3 Portfólio, 4 Task Board, 5 Clima Já
INSERT INTO projetos_habilidades (projeto_id, habilidade_id) VALUES
(1, 11), (2, 11),
(3, 3), (3, 9), (3, 10), (3, 11),
(4, 3), (4, 8), (4, 10),
(5, 2), (5, 8);
