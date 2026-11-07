# Roteiro do vídeo (máx. 2 min) — publique no YouTube como Público ou Não listado

Antes de gravar: importe a coleção, confira `baseUrl` (URL da Vercel) e abra a aba **Variables** da coleção.

| Tempo | O que mostrar |
|---|---|
| 0:00–0:10 | Apresente-se. Mostre a aba **Variables** da coleção: `baseUrl` (URL da Vercel) e os ids. Diga que as variáveis permitem trocar o ambiente e os ids. |
| 0:10–0:25 | **Pessoas**: `Listar` (mostra as 2 pessoas cadastradas) → `Criar` (id novo é salvo em `pessoaId` automaticamente) → `Atualizar` → `Buscar por id`. |
| 0:25–0:55 | **Entidades**: `Criar` em Formações, Experiências, Projetos, Idiomas e Habilidades (cada uma guarda seu id na variável). Mostre rapidamente um `Atualizar` e um `Listar`. |
| 0:55–1:30 | **Relacionamentos**: vincular habilidade à pessoa e ao projeto → `Currículo completo da pessoa` → mude `pessoaId` para `1` na aba Variables e rode de novo (currículo da Vitória) → depois `2` (Lucas). Mostre `Habilidades da pessoa`, `Projetos da pessoa` e o inverso `Pessoas com a habilidade`. |
| 1:30–1:50 | **Deletar**: rode a pasta *Deletar (limpeza)* (ou só `Deletar pessoa`) e mostre que o `GET /pessoas/{{pessoaId}}/curriculo` agora retorna 404, provando a remoção em cascata. |
| 1:50–2:00 | Encerre mostrando o link do GitHub/Vercel. |

Atenção: antes de rodar qualquer `Deletar`, confira que `pessoaId` aponta para a pessoa que você criou no vídeo (e não para 1 ou 2), senão você apaga um dos currículos cadastrados. Se isso acontecer, rode `npm run db:setup` para restaurar o banco.
