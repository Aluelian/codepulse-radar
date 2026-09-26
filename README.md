# CodePulse Radar

Este projeto nasceu de uma ideia simples: transformar dados publicos do GitHub em um painel bonito, util e com cara de produto real.

Eu quis fugir de layout generico e, ao mesmo tempo, praticar fundamentos que toda vaga frontend pede: consumo de API, organizacao de codigo, responsividade e cuidado com experiencia.

## O que voce encontra aqui

- Busca de perfis reais via API do GitHub
- Exibicao de dados principais do usuario
- Lista de repositorios em destaque
- Resumo das linguagens mais usadas
- Tratamento de erros (usuario inexistente, limite da API etc.)

## Tecnologias que usei

- HTML
- CSS
- JavaScript
- TypeScript
- Vite
- GitHub REST API

## O que eu pratiquei neste projeto

- Estruturacao de frontend em modulos
- Requisicoes assincronas com tratamento de falhas
- Conversao de dados de API em informacao visual
- Criacao de uma identidade visual propria

## Como rodar localmente

```bash
npm install
npm run dev
```

## Como gerar build

```bash
npm run build
npm run preview
```

## Publicando no GitHub

Se ainda nao criou o repositorio remoto, voce pode usar este passo a passo:

```bash
git init
git add .
git commit -m "feat: primeiro release do codepulse radar"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

## Deploy rapido

Vercel ou Netlify funcionam muito bem para este projeto.

- Build command: npm run build
- Output directory: dist

## Texto base para LinkedIn

Use como rascunho e adapte para seu jeito de falar:

> Finalizei um projeto novo para meu portfolio: CodePulse Radar.
>
> A ideia foi criar um painel que consome a API publica do GitHub para mostrar, de forma visual, dados de perfil, repositorios e linguagens mais usadas.
>
> Nesse projeto pratiquei HTML, CSS, JavaScript e TypeScript com foco em consumo de API e organizacao de frontend.
>
> Repo: [link]
> Demo: [link]

## Melhorias que quero fazer nas proximas versoes

- Filtro por linguagem
- Ordenacao dos repositorios por estrelas ou atualizacao
- Comparacao entre dois perfis
- Testes automatizados

---

Se quiser trocar ideia ou sugerir melhorias, fico super aberto a feedback.
