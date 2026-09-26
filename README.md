# CodePulse Radar

Esse projeto nasceu de uma ideia simples: transformar dados públicos do GitHub em uma interface visual, útil e com cara de produto real.

Eu queria praticar coisas que fazem diferença no frontend: consumo de API, organização do código, responsividade e uma interface que não parecesse genérica.

## O que ele faz

- Busca perfis do GitHub por username
- Exibe dados principais do usuário
- Mostra seguidores, seguindo, repositórios e estrelas
- Lista repositórios em destaque
- Apresenta um resumo visual das linguagens mais usadas
- Trata erros de usuário inexistente e limite da API
- Tem uma versão mobile dedicada
- Salva o histórico recente de buscas no localStorage

## Tecnologias usadas

- HTML
- CSS
- JavaScript
- TypeScript
- Vite
- GitHub REST API

## O que eu pratiquei aqui

- Requisições assíncronas com fetch
- Estrutura de projeto em módulos
- Manipulação do DOM com TypeScript
- Estilo responsivo para desktop e mobile
- Criação de uma interface mais profissional para portfolio
- Estado de carregamento e skeletons
- Visualização gráfica das linguagens do perfil

## Como rodar localmente

```bash
npm install
npm run dev
```

A aplicação fica disponível em:

```bash
http://localhost:5173/
```

## Como gerar build

```bash
npm run build
npm run preview
```

## Versão mobile

A aplicação também tem uma versão pensada para celular:

- `mobile.html`
- `src/mobile.ts`
- `src/mobile.css`

## Publicar no GitHub

```bash
git init
git add .
git commit -m "feat: primeiro release do codepulse radar"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/codepulse-radar.git
git push -u origin main
```

## Deploy gratuito

Funciona bem no Vercel ou Netlify.

Configuração recomendada:

- Build command: `npm run build`
- Output directory: `dist`

## Texto para postar no LinkedIn

> Acabei de publicar um projeto novo no meu portfolio: CodePulse Radar.
>
> A ideia foi criar uma interface que busca dados públicos do GitHub e mostra isso de uma forma mais visual e prática.
>
> Nesse projeto trabalhei com HTML, CSS, JavaScript, TypeScript e Vite, focando em consumo de API, responsividade e experiência do usuário.
>
> Foi um projeto bem interessante para praticar frontend com algo que parece real e útil, e que consigo usar como parte do meu portfolio.
>
> Repositório: [link do GitHub]
> Demo: [link do deploy]
>
> Feedbacks são bem-vindos.

## Observação final

Foi uma escolha intencional deixar o projeto com visual simples, limpo e funcional, em vez de algo muito “apresentado” ou genérico. O objetivo era criar algo que parecesse mais com uma ideia real de portfolio do que com um template pronto.
