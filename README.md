CodePulse Radar

Este projeto nasceu de uma ideia simples: transformar dados publicos do GitHub em um painel bonito, util e com cara de produto real.

Eu quis fugir de layout generico e, ao mesmo tempo, praticar fundamentos que toda vaga frontend pede: consumo de API, organizacao de codigo, responsividade e cuidado com experiencia.


Busca de perfis reais via API do GitHub
Exibicao de dados principais do usuario
Lista de repositorios em destaque
Resumo das linguagens mais usadas
Tratamento de erros (usuario inexistente, limite da API etc.)

Usei essas tecnologias: 

- HTML
- CSS
- JavaScript
- TypeScript
- Vite
- GitHub REST API

O que foi feito:

Estruturacao de frontend em modulos
Requisicoes assincronas com tratamento de falhas
Conversao de dados de API em informacao visual
Criacao de uma identidade visual propria

Como rodar localmente:

```bash
npm install
npm run dev
```

Como gerar build:

```bash
npm run build
npm run preview
```

Deploy

Vercel ou Netlify funcionam muito bem para este projeto.

- Build command: npm run build
- Output directory: dist


